import React from 'react'
import PropTypes from 'prop-types'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import { useSelector } from 'react-redux'

export const HomeLayout = ({ children }) => {

  const { checkEmptySearchBar } = useSelector(state => state.home)

  return (
    <div className='bg-purple-100 h-full' >
      <NavBar />
      {children}
      <Footer />
      {/* {!checkEmptySearchBar ? null: <Footer />} */}
    </div>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node
}
