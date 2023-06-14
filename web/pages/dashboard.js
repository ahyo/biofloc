import React from "react";
import { useRouter } from "next/router";
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';  

const Dashboard = ({ onLogout }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Logika untuk melakukan logout
    // ...

    // Hapus token dari penyimpanan lokal (localStorage)
    localStorage.removeItem("token");

    // Panggil fungsi onLogout ketika logout berhasil
    onLogout();

    // Redirect ke halaman login setelah logout
    router.push("/login");
  };
  return (  
    <h1>Dashboard</h1> 
  );  
};

export default Dashboard;
