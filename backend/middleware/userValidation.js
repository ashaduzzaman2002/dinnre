const jwt = require("jsonwebtoken");

exports.validedUser = async (req, res, next) => {
  try {
    const cookie = req?.headers?.cookie;

    if (!cookie) {
      return res.status(401).json({ msg: "Token not found 1" });
    }

    const token = cookie?.split("=")[1];

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized access" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRECT);
    req.user = {
      id: decode?.id,
      role: decode?.role,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Unauthorized access" });
  }
};
