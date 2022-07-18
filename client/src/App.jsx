import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useSearchParams
} from "react-router-dom";
import logo from './images/logo.png';
import logout from './images/logout.png';
import Home from './components/home';
import Profile from './components/profile';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div id = 'headerApp'>

          <BrowserRouter>
            <nav className='header'>
              <img src={logo} className="App-logo" alt="logo"/>
              <h2 className='titule'>RED SOCIAL TGL</h2>
              <Link to="home" className='optionPage'> Home </Link>
              <Link to="profile" className='optionPage'> Profile </Link>
              <h4 className='userName'>Welcome ${"User Name"}</h4>
              <img src={logout} className="logout" alt="logout" />
            </nav>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="home" element={<Home/>} />
              <Route path="profile" element={<Profile/>} />
            </Routes>
          </BrowserRouter>
        </div>
      </header>
    </div>
  );
}

export default App;
