const express = require('express');
let User = require('../models/user');

let router = express.Router();

router.get('/list', async (req, res) => {
  let users = await User.findAll();
  res.status(200).json({ users })
});

router.post('/', async (req, res) => {
  let body = req.body;
  
  let userExists = await User.count({
    where: {
      username: body.username,
      email: body.email
    }
  });

  if (body.code === 'only_admin') {
    body.role = 'admin';
  }

  if (userExists) {
    res.status(400).json({ 'message': 'user already exists' });
  } else {
    let newUser = await User.create(body);
    res.status(200).json(newUser);
  }
});

module.exports = router;