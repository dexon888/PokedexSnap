// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/api/classify', async (req, res) => {
  const { imageUrl } = req.body;

  // Placeholder for OpenAI API call
  const result = `Classified image at ${imageUrl}`;

  res.status(200).json({ result });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
