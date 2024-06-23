import { useState } from 'react';
import CaptureImage from '../components/CaptureImage';
import DisplayResult from '../components/DisplayResult';
import Login from '../components/Login';
import Register from '../components/Register';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [result, setResult] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

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
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
    </div>
  );
}
