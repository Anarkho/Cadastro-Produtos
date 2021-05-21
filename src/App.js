//import './App.css';
import React from 'react'
import NavBar from './components/Navbar'
import Routes from './routes/routes'

import {HashRouter} from 'react-router-dom'


function App() {
  return (
    <HashRouter>
      <div className='container'> 
      <NavBar></NavBar>
      <Routes></Routes>
      </div>
    </HashRouter>
  );
}

export default App;
