const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const VerfiyAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.PRIVATE_TOKEN);
      req.userId = decodedData?.id;
      //
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).send(error);
  }
};

module.exports = VerfiyAuth;
