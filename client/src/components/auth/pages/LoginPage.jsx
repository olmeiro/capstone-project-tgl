import { Link } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
// import Dashboard from '../layout/Dashboard'

export const LoginPage =
 () => {
   return (
    <AuthLayout title='Login'>
    <form className='flex flex-col p-8'>
      <label htmlFor="">Usuario</label>
      <input className='form-input px-4 py-3 rounded-full' type="text" placeholder='email' name="" id="" />
      <label htmlFor="">Password</label>
      <input className='form-input px-4 py-3 rounded-full' type="text" placeholder='password' name="" id="" />
      <div className='flex flex-row-reverse justify-between mt-4'>
        <button className='bg-team-brown h-10 w-1/2  ml-3 rounded-lg text-team-dark font-medium hover:bg-gray'>Login</button>

        <Link className='flex justify-center place-items-center underline text-team-blue  hover:bg-gray h-10 w-1/2 rounded-lg text-team-dark font-medium ' color="inherit" to="/auth/register">
        Crear cuenta
        </Link>

      </div>
    </form>

  </AuthLayout>
   )
 }
