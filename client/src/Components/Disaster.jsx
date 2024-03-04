import React from 'react';
import { MapPin } from 'lucide-react';
import '../styles/Disaster.css';
import { displayRandomImage } from '../displayRandomImage.js';

function Disaster() {

  return (
    <>
        <div className='disaster-section'>
          <img src={displayRandomImage()} className='disaster-image'/>
            <h1 className='disaster-name'>Disaster Name</h1>
            <div className='location-section'>
                <MapPin />
                <h2 className='location-name'>Location</h2>
            </div>
            <p className='severity-level'>Severity: x</p>
        </div>
    </>
  )
}

export default Disaster