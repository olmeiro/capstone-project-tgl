import React from 'react'
import PropTypes from 'prop-types'

import imagePath from '../../../../assets/logo_Team_International.png'

export const AuthLayout = ({ children, title = '' }) => {
  return (
    <section className="w-full  flex flex-row sm:flex-col min-h-screen">
      <header className="w-full min-h-full flex flex-row sm:flex-col md:flex-row justify-between p-6 items-center h-28 bg text-team-green">
        <div className="mt-2">
          <img className="w-24" src={imagePath} alt='logo team' />
        </div>
      </header>
      <main className="flex flex-row min-h-[74.2vh] sm:flex-col md:flex-row">

        <section className="w-1/2 sm:w-full flex flex-col justify-center p-10 place-items-center">
          <h1 className='text-7xl sm:text-xl p-6'>Red Social TGL</h1>
          <img className="bg w-56 rounded-lg p-9 mt-9 mb-9" src={imagePath} alt='logo team' />
          <footer>
            <p className='text-sm text-clip whitespace-normal'>Red social Top Gun Lab. Realiza tus proyectos en compañia de los mejores.</p>
          </footer>
        </section>

        <section className="w-1/2 sm:w-full flex flex-col justify-center border-b-team-green">
          <h4 className="text-center text-5xl p-3 text-team-blue  ">{title}</h4>
          {children}
        </section>
      </main>
      <footer className="max-w-full mt-[10] bg-team-blue h-20 text-lg font-medium text-slate-200 flex text-center justify-center items-center">
        <p>&copy;2022 tgl_group. All Rights Reserved.</p>
      </footer>
    </section>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}
