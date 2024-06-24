import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/CaptureImage.module.css';

const CaptureImage = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pokedex_upload');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/drqmh2mqn/upload',
        formData
      );
      setImage(response.data.secure_url);
      onImageUpload(response.data.secure_url);

      // Save the picture information to the backend
      await axios.post('http://localhost:5000/api/pictures', {
        imageUrl: response.data.secure_url,
        result: "example result" // Replace with actual result if available
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className={styles.captureImage}>
      <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} className={styles.fileInput} />
      {image && <img src={image} alt="Uploaded" className={styles.uploadedImg} />}
    </div>
  );
};

export default CaptureImage;
