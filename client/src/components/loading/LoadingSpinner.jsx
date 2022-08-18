import React from 'react'
import './spinner.css'

import cohete from '../../../assets/cohete.jpeg'

export default function LoadingSpinner () {
  return (
    <div className="spinner-container">
      <div className="border-team-green">
        <img
          src={cohete}
          alt="logo team"
          className="md:w-96 md:h-96 sm:w-48 sm:h-48"
        />
      </div>
      <div className="flex justify-center">
        <div className="loading-spinner "></div>
      </div>
    </div>
  )
}
