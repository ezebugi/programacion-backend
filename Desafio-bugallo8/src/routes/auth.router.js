const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Inicio de sesión
router.post('/login', async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Inicio de sesión fallido', user });
    }
    req.login(user, { session: false }, async (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign({ id: user._id }, 'secret_key');
      return res.json({ user, token });
    });
  })(req, res, next);
});

module.exports = router;
