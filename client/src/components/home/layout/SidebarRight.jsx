import React from 'react'
import cohete from "../../../../assets/cohete.jpeg"
import photo1 from "../../../../assets/photo1.jpeg"
import photo2 from "../../../../assets/photo2.jpeg"
import photo3 from "../../../../assets/photo3.jpeg"
import tula from "../../../../assets/tula.jpeg"

export const SidebarRight = () => {
  return (
    <div className='container px-4 basis-1/6 flex-col gap-2'>
      <a href="https://edu.teaminternational.com/" target="_blank" >
        <img
          className="rounded-md m-5"
          src={cohete} alt="team international photo"
        />
      </a>
      <img className='rounded-md m-5 w-[280px] h-[213px]' src={photo2} alt="" />
      <img className='rounded-md m-5 w-[280px] h-[213px]' src={photo3} alt="" />
      <img className='rounded-md m-5 w-[280px] h-[213px]' src={photo1} alt="" />
      <img className='rounded-md m-5 w-[280px] h-[213px]' src={tula} alt="" />
      {/* 280*213 */}
    </div>
  )
}
