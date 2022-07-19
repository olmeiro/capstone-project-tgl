import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const HomeLayout = ({ children, title = '' }) => {
  return (
    <>
      <nav>
        <p>
        este es el nav
        </p>
      <Link color="inherit" to="/auth/login">
        salir
      </Link>
      </nav>
      <h1>Social Media TGL {title}</h1>
      <h2>{title}</h2>
      {children}
      <footer>
        <p>Este es el footer</p>
      </footer>
    </>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}
