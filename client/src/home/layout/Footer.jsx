import React from 'react'
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from "react-icons/bs";

export const Footer = () => {
  return (
    <div className="max-w-full bg-team-dark h-20 mt-3 text-white flex justify-between items-center sm:flex-col">
      <div className='w-1/2 flex justify-center'>
        <p>© 2022TopGunLab™. All Rights Reserved.</p>
      </div>
      <div className='w-1/2 flex justify-center items-center gap-8 sm:gap-1'>
        Siguenos:
        <BsFacebook />
        <BsInstagram />
        <BsTwitter />
        <BsGithub />
        <BsDribbble />
      </div>
    </div>
  )
}
