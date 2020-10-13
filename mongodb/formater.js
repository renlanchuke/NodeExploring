const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const testSchema = new Schema({
  email: {
    type: String,
    get: obfuscate
  }
});

// Mongoose passes the raw value in MongoDB `email` to the getter
function obfuscate(email) {
  const separatorIndex = email.indexOf('@');
  if (separatorIndex < 3) {
    // 'ab@gmail.com' -> '**@gmail.com'
    return email.slice(0, separatorIndex).replace(/./g, '*') +
        email.slice(separatorIndex);
  }
  // 'test42@gmail.com' -> 'te****@gmail.com'
  return email.slice(0, 2) +
      email.slice(2, separatorIndex).replace(/./g, '*') +
      email.slice(separatorIndex);
}

const Test = mongoose.model('Test', testSchema);
const test = new Test({ email: 'ab@gmail.com' });
console.log(test.email); // **@gmail.com
