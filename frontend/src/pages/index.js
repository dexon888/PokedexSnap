import { useEffect, useState } from 'react';
import axios from 'axios';
import CaptureImage from '../components/CaptureImage';
import styles from '../styles/Home.module.css';

export default function Home({ onLogout }) {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchPreviousPictures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pictures');
        setPictures(response.data);
      } catch (error) {
        console.error("Error fetching pictures:", error);
      }
    };

    fetchPreviousPictures();
  }, []);

  const handleImageUpload = async (imageUrl) => {
    setPictures([...pictures, { imageUrl, result: "example result" }]);

    // Save the picture information to the backend
    try {
      await axios.post('http://localhost:5000/api/pictures', {
        imageUrl: imageUrl,
        result: "example result" // Replace with actual result if available
      });
    } catch (error) {
      console.error("Error saving picture to backend:", error);
    }
  };

  const handleLogout = () => {
    // Clear authentication tokens or any other logout logic
    localStorage.removeItem('authToken');
    onLogout();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Upload Image</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </header>
      <CaptureImage onImageUpload={handleImageUpload} />
      <h2>Previous Pictures</h2>
      <div className={styles.picturesGrid}>
        {pictures.map((picture, index) => (
          <div key={index} className={styles.pictureItem}>
            <img src={picture.imageUrl} alt="Uploaded" className={styles.pictureImg} />
            <p>{picture.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
