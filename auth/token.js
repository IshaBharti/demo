const jwt = require("jsonwebtoken");

const generateToken = (User) => {
  const token = jwt.sign({ User }, "i", { expiresIn: "604800" });
  return token;
};
module.exports=generateToken