import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

import { useAuthStore } from '../../hooks'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'

const formData = {
  alias: '',
  nombre: '',
  email: '',
  telefono: '',
  contraseña: '',
  contraseña1: ''
}

const formValidations = {
  alias: [(value) => value.length >= 4, 'El nombre de usuario es invalido'],
  nombre: [(value) => value.length >= 4, 'El nombre debe tener al menos 6 letras'],
  email: [(value) => value.includes('@'), 'El email es obligatorio'],
  telefono: [(value) => value.length <= 7, 'El telefono es obligatorio'],
  contraseña: [(value) => value.length >= 6, 'El password es obligatorio'],
  contraseña1: [(value) => value.length >= 6, 'El confirm password es obligatorio']
}

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { startRegister, errorMessage } = useAuthStore()

  const { alias, nombre, email, telefono, contraseña, contraseña1, onInputChange, isFormValid, aliasValid, nombreValid, emailValid, telefonoValid, contraseñaValid, contraseña1Valid } = useForm(formData, formValidations)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    console.log({ alias, nombre, email, telefono, contraseña, contraseña1 })
    if (contraseña !== contraseña1) {
      return Swal.fire('Contraseñas no coinciden', 'error')
    }

    startRegister({ alias, nombre, email, telefono, contraseña })
    console.log(isFormValid)
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en el registro', errorMessage, 'error')
    }
  }, [errorMessage])

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
          placeholder="nombre de usuario"
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
          placeholder="nombre y apellidos"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && nombreValid}</span>

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

        <label htmlFor="">Teléfono</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="teléfono"
          id="telefono"
          name="telefono"
          value={telefono}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && telefonoValid}</span>

        <label htmlFor="">Contraseña</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="password"
          id="contraseña"
          name="contraseña"
          value={contraseña}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && contraseñaValid}</span>

        <label htmlFor="">Confirmar contraseña</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="password"
          id="contraseña1"
          name="contraseña1"
          value={contraseña1}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && contraseña1Valid}</span>

        <div className="flex flex-row-reverse justify-between mt-4">
          <button type='submit' className="bg-team-brown h-10 w-1/2  ml-3 rounded-lg text-team-dark font-medium hover:bg-team-green">
            Registrar
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
