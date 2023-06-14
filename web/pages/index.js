import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Dashboard from './dashboard';
import Login from './login';

const Home = () => {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Cek apakah token sudah ada di localStorage saat komponen dimuat
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);


  // Fungsi untuk menangani login
  const handleLogin = (token) => {
    // Simpan token ke penyimpanan lokal (localStorage)
    localStorage.setItem('token', token);
    setLoggedIn(true);
  };

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    // Hapus token dari penyimpanan lokal (localStorage)
    localStorage.removeItem('token');

    setLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Home;
