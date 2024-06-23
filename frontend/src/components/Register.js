import { useState } from 'react';
import styles from '../styles/Auth.module.css';

const Register = ({ onRegister, switchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Placeholder logic for registration
    if (email && password) {
      onRegister();
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitButton}>Register</button>
      </form>
      <button onClick={switchToLogin} className={styles.switchButton}>Login</button>
    </div>
  );
};

export default Register;
