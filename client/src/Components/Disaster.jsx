import React from 'react';
import { MapPin } from 'lucide-react';
import '../styles/Disaster.css';

function Disaster() {

  const generateRandomImage = ()=> {
    const randomNumber = Math.random();
    if(randomNumber<= 1/4)
      return 'disaster1.jpeg';
    else if(randomNumber> 1/4 && randomNumber <= 2/4)
      return 'disaster2.jpeg';
    else if (randomNumber > 2/4 && randomNumber <=3/4)
      return 'disaster3.jpeg';
    else
      return 'disaster4.jpeg';
  }

  return (
    <>
        <div className='disaster-section'>
          <img src={generateRandomImage()} className='disaster-image'/>
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