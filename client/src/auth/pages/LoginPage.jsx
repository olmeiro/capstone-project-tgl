import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthLayout } from '../layout/AuthLayout'
import { useAuthStore, useForm } from '../../hooks'
import Swal from 'sweetalert2'

const formData = {
  alias: '',
  pw: ''
}

const formValidations = {
  alias: [(value) => value.length >= 4, 'El alias es obligatorio'],
  pw: [(value) => value.length >= 6, 'El password es obligatorio']
}

export const LoginPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { startLogin, errorMessage } = useAuthStore()

  const { alias, pw, onInputChange, isFormValid, aliasValid, pwValid } = useForm(formData, formValidations)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    startLogin({ alias, contraseña: pw })
    console.log(isFormValid)
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticacion', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className="flex flex-col p-8">
        <label htmlFor="">Correo electrónico</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="alias"
          id="alias"
          name="alias"
          value={alias}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-blue'>{formSubmitted && aliasValid}</span>

        <label htmlFor="">Contraseña</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="password"
          placeholder="password"
          id="pw"
          name="pw"
          value={pw}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-blue'>{formSubmitted && pwValid}</span>
        <button
          type="submit"
          className="bg-team-brown h-10 w-full  ml-3 mt-2 rounded-lg text-team-dark font-medium hover:bg-team-green"
        >
          Login
        </button>

        <div className="flex flex-row-reverse justify-between mt-4">
          <Link
            className="flex justify-center place-items-center underline text-team-blue  hover:bg-gray h-10 w-1/2 rounded-lg font-medium "
            color="inherit"
            to="/auth/register"
          >
            Crear cuenta
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
