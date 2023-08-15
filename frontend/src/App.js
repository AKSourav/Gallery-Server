import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/auth/auth';
import HomePage from './components/Home/HomePage';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<HomePage/>} />
        <Route exact path='/auth' element={<Auth/>} />
      </Routes>
    </div>
  );
}

export default App;
