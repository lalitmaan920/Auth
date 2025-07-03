import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home'; //
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main app route */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
