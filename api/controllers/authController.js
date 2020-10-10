const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/userModel');
const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

router.post('/register', async (req, res) => {
  const { login } = req.body;
  try {
    if (await User.findOne({ login }))
      return res.status(400).send({ error: 'Usuário já existe' });
      
    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Cadastro falhou'});
  }
});

router.post('/authenticate', async (req, res) => {
  req.body.login = req.body.login.toLowerCase();
  const { login, password } = req.body;

  const user = await User.findOne({ login }).select('+password');

  if (!user)
    return res.status(400).send({ error: 'Usuário não encontrado'});

  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Senha inválida'});

  user.password = undefined;
  
  return res.send({ user, token: generateToken({ id: user.id }) });
});

module.exports = app => app.use('/api/auth', router);