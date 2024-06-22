import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/CaptureImage.module.css';

const CaptureImage = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_cloudinary_preset'); // Replace with your Cloudinary preset

    const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloudinary_name/image/upload', formData);
    setImage(response.data.secure_url);
    onImageUpload(response.data.secure_url);
  };

  return (
    <div className={styles.captureImage}>
      <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" width="300" />}
    </div>
  );
};

export default CaptureImage;
