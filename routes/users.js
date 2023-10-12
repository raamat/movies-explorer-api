const userRoutes = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

const {
  validationUpdateUser,
} = require('../middlewares/validations');

userRoutes.get('/me', auth, getCurrentUser);
userRoutes.patch('/me', auth, validationUpdateUser, updateUser);

module.exports = userRoutes;
