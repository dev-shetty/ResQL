import React from 'react';
import '../styles/DonateAndRescue.css';

function DonateAndRescue() {
  return (
    <div className='donate-and-rescue-section'>
      <div className='donate-section'>
        <p>Help us to overcome the disaster</p>
        <p>Your contribution makes a huge difference!</p>
        <button className='button'>Contribute for a cause</button>
      </div>
      <div className='rescuer-registration-section'>
        <p>Join us in the mission</p>
        <p>Register as a Rescuer!</p>
        <button className='button'>Register as a Rescuer</button>
      </div>
    </div>
  )
}

export default DonateAndRescue;