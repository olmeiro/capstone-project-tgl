import React from 'react'
import PropTypes from 'prop-types'

import { Footer } from './Footer'
import { NavBar } from './NavBar'

export const HomeLayout = ({ children }) => {
  return (
    <div className='bg-purple-100'>
      <NavBar />
      { children }
      <Footer />
    </div>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node
}
