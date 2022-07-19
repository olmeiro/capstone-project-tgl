import { AuthLayout } from '../layout/AuthLayout'
import { Link } from 'react-router-dom'

export const RegisterPage = () => {
  return (
    <AuthLayout title='Registrarse'>
   <form className='flex flex-col p-8'>
      <label htmlFor="">Usuario</label>
      <input className='form-input px-4 py-3 rounded-full' type="text" placeholder='nombre de usuario' name="userName" id="userName" />

      <label htmlFor="">Nombre completo</label>
      <input className='form-input px-4 py-3 rounded-full' type="text" placeholder='nombre y apellidos' name="name" id="name" />

      <label htmlFor="">Correo electrónico</label>
      <input className='form-input px-4 py-3 rounded-full' type="text" placeholder='email' name="email" id="email" />

      <label htmlFor="">Teléfono</label>
      <input className='form-input px-4 py-3 rounded-full' type="text" placeholder='teléfono' name="phone" id="phone" />

      <label htmlFor="">Contraseña</label>
      <input className='form-input px-4 py-3 rounded-full' type="text" placeholder='password' name="" id="" />

      <label htmlFor="">Confirmar contraseña</label>
      <input className='form-input px-4 py-3 rounded-full' type="text" placeholder='password' name="confirmPassword" id="confirmPassword" />

      <div className='flex flex-row-reverse justify-between mt-4'>
        <button className='bg-team-brown h-10 w-1/2  ml-3 rounded-lg text-team-dark font-medium hover:bg-gray'>Registrar</button>
      </div>
    </form>
  </AuthLayout>
  )
}
