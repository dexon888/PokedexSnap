import styles from '../styles/PreviousPictures.module.css';

const PreviousPictures = ({ pictures }) => {
  return (
    <div className={styles.previousPictures}>
      {pictures.map((picture, index) => (
        <div key={index} className={styles.pictureItem}>
          <img src={picture.imageUrl} alt={`Captured ${index}`} className={styles.pictureImage} />
          <p>{picture.result.stats}</p>
          <p>{picture.result.fact}</p>
        </div>
      ))}
    </div>
  );
};

export default PreviousPictures;
