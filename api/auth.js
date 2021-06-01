const express = require('express');
let jwt = require('jsonwebtoken');
let User = require('../models/user');
let { PRIVATE_KEY, EXPIRATION_TIME } = require('../constans');

let router = express.Router();

router.post('/login', async (req, res) => {
  let body = req.body;

  let userExists = await User.findOne({
    where: {
      username: body.username,
      password: body.password
    }
  });

  if (userExists) {
    let token = jwt.sign(
      {
        data: { 
          username: body.username,
          email: userExists.email,
          role: userExists.role
        }
      },
      PRIVATE_KEY,
      { expiresIn: EXPIRATION_TIME }
    );

    res.status(200).json({ 'token': `Bearer ${token}` });
  } else {
    res.status(404).json({ 'message': 'user not exists' });
  }
});

module.exports = router;