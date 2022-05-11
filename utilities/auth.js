const bcrypt = require("bcrypt");

const generatePasswordHash = (password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword
};

module.exports = {
    generatePasswordHash,
}