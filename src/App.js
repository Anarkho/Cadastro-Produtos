//import './App.css';
import React from 'react'
import NavBar from './components/Navbar'
import Routes from './routes/routes'


function App() {
  return (
    <>
      <div className='container'> 
      <NavBar></NavBar>
      <Routes></Routes>
      </div>
    </>
  );
}

export default App;
