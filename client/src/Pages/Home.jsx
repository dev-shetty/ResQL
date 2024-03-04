import React from 'react';

import Disaster from '../Components/Disaster';
import RequestDonation from '../Components/DonateAndRescue';

import '../styles/Home.css';

function Home() {
  return (
    <div className='home-page'>
      <RequestDonation/>
      <div className='disaster-list'>
        <Disaster/>
        <Disaster/>
        <Disaster/>
        <Disaster/>
        <Disaster/>
        <Disaster/>
        <Disaster/>
        <Disaster/>
        <Disaster/>
        <Disaster/>
        
      </div>
    </div>
  )
}

export default Home