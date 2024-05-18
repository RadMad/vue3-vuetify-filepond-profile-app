const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let userProfile = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthday: '',
  about: '',
  avatar: '',
};

app.get('/api/user/profile', (req, res) => {
  res.json(userProfile);
});

app.post('/api/user/profile', (req, res) => {
  userProfile = req.body;
  res.json(userProfile);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
