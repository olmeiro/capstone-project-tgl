import React from 'react'
import PropTypes from 'prop-types'

import { FooterPage } from './Footer'
import { NavBar } from './NavBar'

export const HomeLayout = ({ children }) => {
  return (
    <div className="bg-purple-100">
      <NavBar />
      {children}
      <FooterPage />
    </div>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node
}
