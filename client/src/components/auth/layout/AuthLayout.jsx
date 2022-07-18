import PropTypes from 'prop-types'

export const AuthLayout = ({ children, title = '' }) => {
  return (
    <>
    <nav>
      este es el nav
    </nav>
      <h1>Social Media TGL</h1>
      <h2>{title}</h2>
      {children}
    <footer>
      <p>Este es el footer</p>
    </footer>
    </>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}
