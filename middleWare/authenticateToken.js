const jwt = require("jsonwebtoken");

const accessToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    //console.log(token);
    const bearer = token.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(bearer, "hhh");
    req.data = decoded;
    // console.log(req.data);
    //console.log(decoded,"OOOOOOOOOOO");

    next();
  } catch (error) {
return res.send("unauthorized token")  }
};
module.exports = accessToken;
