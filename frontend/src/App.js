import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./components/Dashboard";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (username) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? (
          <Dashboard username={currentUser} onLogout={handleLogout} />
        ) : (
          <Routes>
            <Route 
              path="/" 
              element={<HomePage onLoginSuccess={handleLoginSuccess} />} 
            />
          </Routes>
        )}
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;