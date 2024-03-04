import React from 'react';
import { displayRandomImage } from '../displayRandomImage.js';
import '../styles/DisasterCard.css'

function DisasterCard() {
  return (
    <>
        <div className='disaster-card'>
            <img src={displayRandomImage()} className='disaster-image'/>
            <h1 className='disaster-name'>Disaster Name</h1>
            <h3>Disaster ID: x</h3>
            <h3>Location</h3>
            <h3>Disaster type</h3>
            <h3>Date</h3>
            <h3>Severity: x</h3>
            <h3>People Affected: x</h3>
            <p>Disaster description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore nostrum, odit ipsum laborum vero aliquid? Ullam, explicabo? Voluptate, debitis fugiat expedita eveniet laudantium nihil sequi, nemo itaque consequatur aut pariatur?</p>
            <h3>Reported by: A</h3>

        </div>
    </>
  )
}

export default DisasterCard