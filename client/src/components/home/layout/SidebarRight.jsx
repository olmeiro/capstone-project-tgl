import React from 'react'

import cohete from '../../../../assets/cohete.jpeg'
import photo1 from '../../../../assets/photo1-removebg-preview.png'
import photo2 from '../../../../assets/photo2-removebg-preview.png'
import photo3 from '../../../../assets/photo3-removebg-preview.png'
import tula from '../../../../assets/tula-removebg-preview.png'

export const SidebarRight = () => {
  return (
    <div className='container px-4 basis-1/6 flex-col'>
      <a href="https://www.teaminternational.com/" target="_blank" rel="noreferrer" >
        <img
          className="rounded-md w-[280px]"
          src={cohete} alt="team international photo"
        />
      </a>
      <img className='bg-team-blue rounded-md mt-1 w-[280px] h-[213px]' src={photo2} alt="sidebar image" />
      <img className='bg-team-blue rounded-md mt-1 w-[280px] h-[213px]' src={photo3} alt="sidebar image" />
      <img className='bg-team-blue rounded-md mt-1 w-[280px] h-[213px]' src={photo1} alt="sidebar image" />
      <img className='rounded-md bg-team-green mt-1 w-[280px] h-[213px]' src={tula} alt="sidebar image" />
    </div>
  )
}
