import { useState, useEffect } from 'react';
import CaptureImage from '../components/CaptureImage';
import DisplayResult from '../components/DisplayResult';
import PreviousPictures from '../components/PreviousPictures';
import Login from '../components/Login';
import Register from '../components/Register';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [result, setResult] = useState(null);
  const [previousPictures, setPreviousPictures] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // Fetch previous pictures from the database
    const fetchPreviousPictures = async () => {
      const response = await fetch('/api/pictures');
      const data = await response.json();
      setPreviousPictures(data.pictures);
    };

    fetchPreviousPictures();
  }, []);

  const handleImageUpload = async (imageUrl) => {
    const response = await fetch('/api/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await response.json();
    setResult(data.result);

    // Save the picture and result to the database
    await fetch('/api/savePicture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl, result: data.result }),
    });

    // Update previous pictures list
    setPreviousPictures((prev) => [...prev, { imageUrl, result: data.result }]);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  const switchToRegister = () => {
    setIsRegistering(true);
  };

  const switchToLogin = () => {
    setIsRegistering(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsRegistering(false);
    setResult(null);
  };

  if (!isAuthenticated) {
    return isRegistering ? (
      <Register onRegister={handleRegister} switchToLogin={switchToLogin} />
    ) : (
      <Login onLogin={handleLogin} switchToRegister={switchToRegister} />
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.captureSection}>
        <h1 className={styles.heading}>Capture Pokémon</h1>
        <CaptureImage onImageUpload={handleImageUpload} />
      </section>
      {result && (
        <section className={styles.resultSection}>
          <DisplayResult result={result} />
        </section>
      )}
      <section className={styles.previousSection}>
        <h2 className={styles.heading}>Previous Captures</h2>
        <PreviousPictures pictures={previousPictures} />
      </section>
      <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
    </div>
  );
}
