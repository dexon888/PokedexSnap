// frontend/pages/index.js
import { useState } from 'react';
import CaptureImage from '../components/CaptureImage';
import DisplayResult from '../components/DisplayResult';

export default function Home() {
  const [result, setResult] = useState(null);

  const handleImageUpload = async (imageUrl) => {
    const response = await fetch('http://localhost:5000/api/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div>
      <h1>Pokedex IRL</h1>
      <CaptureImage onImageUpload={handleImageUpload} />
      <DisplayResult result={result} />
    </div>
  );
}
