const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const users = require('./api/user');
const auth = require('./api/auth');
const images = require('./api/images');

let app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// Add routes to main app
app.use('/user', users);
app.use('/auth', auth);
app.use('/images', images);

app.get('/', (req, res) => {
  res.status(200).json({ 'hello': 'world' });
});

app.listen(2600, () => {
  console.log('Server is up and listening at port 2600');
});