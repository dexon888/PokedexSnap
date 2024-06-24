import { useState } from 'react';
import styles from '../styles/Auth.module.css';

const Login = ({ onLogin, switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Placeholder logic for authentication
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.pokedex}>
        <div className={styles.topSection}>
          <div className={styles.circle}></div>
        </div>
        <div className={styles.bottomSection}>
          <h1 className={styles.heading}>Login</h1>
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
            <button type="submit" className={styles.submitButton}>Login</button>
          </form>
          <button onClick={switchToRegister} className={styles.switchButton}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
