import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Home from './index';
import Login from '../components/Login';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    router.push('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    router.push('/login');
  };

  return isAuthenticated ? (
    <Home onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default MyApp;
