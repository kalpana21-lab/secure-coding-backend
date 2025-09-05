// hash.js
import bcrypt from 'bcrypt';

const password = 'newSecurePassword123';

bcrypt.hash(password, 10).then(hash => {
  console.log('🔐 New hash:', hash);
});