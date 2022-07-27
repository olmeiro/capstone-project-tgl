import { useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthLayout } from '../layout/AuthLayout'
import { useAuthStore, useForm } from '../../hooks'

const formData = {
  email: '',
  pw: ''
}

const formValidations = {
  pw: [(value) => value.length >= 1, 'El password es obligatorio'],
  email: [(value) => value.includes('@'), 'El email es obligatorio']
}

export const LoginPage = () => {
  const { startLogin } = useAuthStore()

  const [formSubmitted, setFormSubmitted] = useState(false)

  const { email, pw, onInputChange, isFormValid, emailValid, pwValid } = useForm(formData, formValidations)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    startLogin({ username: email, password: pw })
    console.log(isFormValid)
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className="flex flex-col p-8">
        <label htmlFor="">Usuario</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="email"
          id="email"
          name="email"
          value={email}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-blue'>{formSubmitted && emailValid}</span>

        <label htmlFor="">Password</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
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
