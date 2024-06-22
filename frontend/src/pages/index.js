import { useState } from 'react';
import CaptureImage from '../components/CaptureImage';
import DisplayResult from '../components/DisplayResult';
import styles from '../styles/Home.module.css';

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
    <div className={styles.pokedex}>
      <div className={styles.leftPanel}>
        <div className={styles.camera}></div>
        <div className={styles.screen}>
          <CaptureImage onImageUpload={handleImageUpload} />
        </div>
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.resultScreen}>
          <DisplayResult result={result} />
        </div>
      </div>
    </div>
  );
}
