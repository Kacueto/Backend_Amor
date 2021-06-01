const express = require('express');
const { tokenRequired, isAdmin } = require('../middlewares/auth');
const Image = require('../models/image');

let router = express.Router();

router.post('/upload', [ tokenRequired, isAdmin ], async (req, res) => {
  let encodedImage = req.body.image;

  await Image.create({ encodedImage });
  res.status(200).json({ 'message': 'image uploaded' });
});

router.get('/', [ tokenRequired, isAdmin ], async (req, res) => {
  let lastRecord = await Image.findOne({
    limit: 1,
    order: [[ 'createdAt', 'DESC' ]]
  });

  let image = (lastRecord) ? lastRecord.encodedImage : '';
  res.status(200).json({ 'image': image });
});

module.exports = router;