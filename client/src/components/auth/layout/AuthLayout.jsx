import PropTypes from 'prop-types'

export const AuthLayout = ({ children, title = '' }) => {
  return (
    <div >
    <div className='w-full border-solid h-64 bg-black text-cyan-200'>
      este es el nav
    </div>
      <h1>Social Media TGL</h1>
      <h2>{title}</h2>
      {children}
    <footer>
      <p>Este es el footer</p>
    </footer>
    </div>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}
