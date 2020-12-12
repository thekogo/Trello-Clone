/* eslint-disable object-curly-newline */
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

const userService = require('../services/userService')(db);

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const targetUser = await userService.findUser(email);

  if (targetUser) {
    return res.status(400).send({ message: 'email already taken.' });
  }

  const salt = bcryptjs.genSaltSync(12);
  const hashedPass = bcryptjs.hashSync(password, salt);

  await userService.userCreate(firstName, lastName, email, hashedPass);

  return res.status(201).send({ message: 'User created' });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const targetUser = await userService.findUser(email);
  if (!targetUser) {
    return res.status(400).send({ message: 'email or password is wrong' });
  }

  const isCorrectPass = bcryptjs.compareSync(password, targetUser.password);
  if (!isCorrectPass) {
    return res.status(400).send({ message: 'email or password is wrong' });
  }

  const payload = {
    id: targetUser.id,
    firstName: targetUser.firstName,
    lastName: targetUser.lastName,
    email: targetUser.email,
  };
  const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
  return res.status(200).send({
    token,
    message: 'Login Successful',
  });
};

module.exports = {
  register,
  login,
};
