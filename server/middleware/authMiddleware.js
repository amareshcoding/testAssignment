import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    var token = req.header('Authorization');
    if (!token) return res.status(403).send('Access Denied!');

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.status(403).send('Auth Token is Invalid!');

    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
