import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
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
  alias: [(value) => value.length >= 4, 'El alias de usuario tener al menos 4 caracteres'],
  name: [(value) => value.length >= 4, 'El nombre debe tener al menos 4 caracteres'],
  email: [(value) => value.includes('@'), 'El email es obligatorio'],
  phone: [(value) => value.length >= 7, 'El número de telefono es númerico de 7 digitos'],
  password: [(value) => value.length >= 6, 'El password es numerico de 6 digitos'],
  password1: [(value) => value.length >= 6, 'El password es numerico de 6 digitos']
}

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { startRegister, errorMessage } = useAuthStore()
  const navigate = useNavigate();

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
    navigate('LoginPage');
    //history.push("/LoginPage");
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

        <label htmlFor="">Teléfono</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="teléfono"
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
