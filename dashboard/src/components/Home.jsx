import React, { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("https://full-stack-trading-app-nyyt.onrender.com/auth", {
          withCredentials: true,
        });
        if (response.data.status) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          window.location.href = "https://main.d3sp359p7k5wy0.amplifyapp.com/login";
        }
      } catch (error) {
        setIsAuthenticated(false);
        window.location.href = "https://main.d3sp359p7k5wy0.amplifyapp.com/login";
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
