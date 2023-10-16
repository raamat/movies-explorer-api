const { NODE_ENV, SECRET_KEY } = process.env;
const JWT = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthenticationError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = JWT.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret',
    );
  } catch (err) {
    return next(new AuthenticationError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
