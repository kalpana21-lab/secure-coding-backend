from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client.secure_quiz_db

quiz = {
    "title": "Secure Coding Basics",
    "questions": [
        {
            "_id": "q1",
            "prompt": "Which input type helps prevent XSS?",
            "options": ["text", "email", "password", "number"],
            "correctAnswer": "email"
        },
        {
            "_id": "q2",
            "prompt": "What does ESLint check?",
            "options": ["Syntax", "Security", "Performance", "All of the above"],
            "correctAnswer": "All of the above"
        }
        {
            "_id": "q3",
            "prompt": "Which HTTP header helps prevent clickjacking?",
            "options": ["X-Frame-Options", "Content-Type", "Authorization", "Cache-Control"],
            "correctAnswer": "X-Frame-Options"
        }

    ]
}

db.quizzes.insert_one(quiz)
print("✅ Quiz seeded successfully!")
