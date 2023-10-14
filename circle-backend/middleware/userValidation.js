const jwt = require('jsonwebtoken');

exports.validedUser = async (req, res, next) => {
  try {
    const cookie = req?.headers?.cookie;
    
    if (!cookie) {
      return res.status(401).json({ msg: 'Token not found 1' });
    }

    const token = cookie?.split('=')[1];

    if (!token) {
      return res.status(401).json({ msg: 'Unauthorized access' });
    }

    jwt.verify(token, process.env.JWT_SECRECT, (err, decoded) => {
      if (err) {
        throw err;
      }

      req.userId = decoded.user;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: 'Unauthorized access' });
  }
};
