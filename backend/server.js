const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const pictures = [];

app.post('/api/pictures', (req, res) => {
  const { imageUrl, result } = req.body;
  const picture = { imageUrl, result };
  pictures.push(picture);
  res.status(201).json(picture);
});

app.get('/api/pictures', (req, res) => {
  res.status(200).json(pictures);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
