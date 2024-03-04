import React from 'react';
import '../styles/Navbar.css';
import {Search} from 'lucide-react';

function Navbar() {
  return (
    <div>
        <div className='navbar-section'>
          <h1 className='navbar-title'>ReSQL</h1>
          <div className='searchbar'>
            <Search />
            <input type="text" placeholder='Search' className='searchbar-input'/>
          </div>
          <h2 className='login'>Login</h2>
        </div>
    </div>
  )
}

export default Navbar