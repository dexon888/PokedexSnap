const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@astrajs/rest');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function createAstraClient() {
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
  });

  return astraClient;
}

app.post('/api/classify', async (req, res) => {
  const { imageUrl } = req.body;

  try {
    const response = await openai.createImageClassification({
      image: imageUrl,
      model: 'your_model_id', // Replace with your model ID
    });

    const result = response.data;
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/savePicture', async (req, res) => {
  const { imageUrl, result } = req.body;
  const astraClient = await createAstraClient();

  try {
    await astraClient
      .namespace('your_namespace')
      .collection('pictures')
      .create({ imageUrl, result });

    res.status(200).json({ message: 'Picture saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pictures', async (req, res) => {
  const astraClient = await createAstraClient();

  try {
    const response = await astraClient
      .namespace('your_namespace')
      .collection('pictures')
      .find({});
    
    res.status(200).json({ pictures: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
