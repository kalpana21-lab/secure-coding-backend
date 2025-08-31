from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from bson.errors import InvalidId

app = Flask(__name__)

# 🔗 MongoDB setup
client = MongoClient("mongodb://localhost:27017")
db = client.secure_quiz_db
quizzes_collection = db.quizzes

# 🧪 Get list of quizzes
@app.route('/api/quizzes', methods=['GET'])
def get_quizzes():
    quizzes = quizzes_collection.find({}, {"title": 1})
    result = [{"_id": str(q["_id"]), "title": q["title"]} for q in quizzes]
    return jsonify(result)

# 🩺 Health check
@app.route('/ping')
def ping():
    return {'status': 'ok'}, 200

# 🧠 Submit quiz answers
@app.route('/api/quizzes/68a1e557d2f3b7505d5628ea/submit', methods=['POST'])
def submit_quiz(quiz_id):
    try:
        quiz_obj_id = ObjectId(68a1e557d2f3b7505d5628ea)
    except InvalidId:
        return jsonify({"error": "Invalid quiz ID format"}), 400

    data = request.get_json()
    if not data or "answers" not in data:
        return jsonify({"error": "Missing answers"}), 400

    quiz = quizzes_collection.find_one({"_id": quiz_obj_id})
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404

    answers = data["answers"]
    score = 0
    feedback = []

    for question in quiz["questions"]:
        qid = question["_id"]
        correct = question["correctAnswer"]
        user_answer = answers.get(qid)

        if user_answer is None:
            feedback.append({"question": question["prompt"], "result": "⚠️ No answer provided"})
        elif user_answer == correct:
            score += 1
            feedback.append({"question": question["prompt"], "result": "✅ Correct"})
        else:
            feedback.append({"question": question["prompt"], "result": f"❌ Incorrect (Correct: {correct})"})

    return jsonify({
        "score": score,
        "total": len(quiz["questions"]),
        "feedback": feedback
    })

# 🚀 Run the app
if __name__ == '__main__':
    app.run(port=5000, debug=True)