import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm, useAuthStore } from '../../../hooks'

const formData = {
  alias: '',
  name: '',
  email: '',
  phone: '',
  password: '',
  password1: ''
}

const formValidations = {
  alias: [(value) => {
    const regex = /[a-zA-Z][a-zA-Z0-9-_]{3,32}/
    const regexAlias = regex.test(value)
    return regexAlias
  }, 'El alias de usuario tener al menos 4 caracteres, pueden ser letras con números.'],
  name: [(value) => {
    const regex = /^[a-z\s]+$/i
    const regexName = regex.test(value)
    return regexName
  }, 'Se require primer nombre y primer apellido. Sólo letras.'],
  email: [(value) => {
    const regex = /[a-z0-9]+[_a-z0-9/.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/ig
    const regexEmail = regex.test(value)
    return regexEmail
  }, 'El email es incorrecto.'],
  phone: [(value) => {
    // value.length >= 7
    const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
    const testRegex = regex.test(value)
    return testRegex
  }, 'El número de contacto es número móvil de 10 dígitos.'],
  password: [(value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm
    const regexPassword = regex.test(value)
    return regexPassword
  }, 'El password debe contener almenos 6 caracteres, al menos una mayuscula, minúscula, puede contener carácteres especiales.'],
  password1: [(value) => value.length >= 6, 'El password es numerico de 6 digitos']
}

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { startRegister, errorMessage } = useAuthStore()
  const navigate = useNavigate()

  const { alias, name, email, phone, password, password1, onInputChange, aliasValid, nameValid, emailValid, phoneValid, passwordValid, password1Valid, isFormValid } = useForm(formData, formValidations)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (password !== password1) {
      return Swal.fire('Contraseñas no coinciden', 'error')
    }
    if (isFormValid) {
      startRegister({ alias, name, email, phone, password })
    }
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en el registro', errorMessage, 'error')
    }
  }, [errorMessage])

  const handleClick = () => {
    navigate('LoginPage')
    // history.push("/LoginPage");
  }

  return (
    <AuthLayout title="Registrarse">
      <form
       className="flex flex-col p-8"
       onSubmit={onSubmit}
      >

        <label htmlFor="">Alias</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="name de usuario"
          id="alias"
          name="alias"
          value={alias}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && aliasValid}</span>

        <label htmlFor="">Nombre completo</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="name y apellidos"
          id="name"
          name="name"
          value={name}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && nameValid}</span>

        <label htmlFor="">Correo electrónico</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="email"
          id="email"
          name="email"
          value={email}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && emailValid}</span>

        <label htmlFor="">Celular</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="celular"
          id="phone"
          name="phone"
          value={phone}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && phoneValid}</span>

        <label htmlFor="">Contraseña</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="password"
          id="password"
          name="password"
          value={password}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && passwordValid}</span>

        <label htmlFor="">Confirmar contraseña</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="password"
          id="password1"
          name="password1"
          value={password1}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && password1Valid}</span>

        <div className="flex flex-row-reverse justify-between mt-4">
        <button type="button" onClick={handleClick} className="bg-team-brown h-10 w-1/2  ml-3 rounded-lg text-team-dark font-medium hover:bg-team-green">
            Regresar
          </button>
          <button type='submit' className="bg-team-brown h-10 w-1/2  ml-3 rounded-lg text-team-dark font-medium hover:bg-team-green">
            Registrar
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
