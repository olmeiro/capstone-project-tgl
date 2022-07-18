import { Link } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'

export const LoginPage =
 () => {
   return (
    <AuthLayout title='login'>
      <form>
        <label htmlFor="">email</label>
        <input type="text" placeholder='email' name="" id="" />
        <label htmlFor="">password</label>
        <input type="text" placeholder='password' name="" id="" />
        <button>register</button>
      </form>

      <Link color="inherit" to="/auth/register">
        Crear una cuenta
      </Link>
    </AuthLayout>
   )
 }
