import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../../hooks'
import Swal from 'sweetalert2'

const formData = {
  userName: '',
  name: '',
  email: '',
  phone: '',
  pw: '',
  pw1: ''
}

// const formValidations = {
//   userName: [(value) => value.length >= 4, 'El nombre de usuario es invalido'],
//   name: [(value) => value.length >= 4, 'El nombre debe tener al menos 6 letras'],
//   email: [(value) => value.includes('@'), 'El email es obligatorio'],
//   phone: [(value) => value.length >= 7, 'El telefono es obligatorio'],
//   pw: [(value) => value.length >= 6, 'El password es obligatorio'],
//   pw1: [(value) => value.length >= 6, 'El confirm password es obligatorio']
// }
const formValidations = {
  email: [(value) => value.includes('@'), 'El email es obligatorio'],
  pw: [(value) => value.length >= 6, 'El password es obligatorio'],
  pw1: [(value) => value.length >= 6, 'El confirm password es obligatorio']
}

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { startRegister, errorMessage } = useAuthStore()

  // const { userName, name, email, phone, pw, pw1, onInputChange, isFormValid, userNameValid, nameValid, emailValid, phoneValid, pwValid, pw1Valid } = useForm(formData, formValidations)
  const { email, pw, pw1, onInputChange, isFormValid, emailValid, pwValid, pw1Valid } = useForm(formData, formValidations)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    // console.log({ userName, name, email, phone, pw, pw1, onInputChange })
    if (pw !== pw1) {
      return Swal.fire('Contraseñas no coinciden', 'error')
    }

    startRegister({ username: email, password: pw })
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

        {/* <label htmlFor="">Usuario</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="nombre de usuario"
          id="userName"
          name="userName"
          value={userName}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && userNameValid}</span> */}

        {/* <label htmlFor="">Nombre completo</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="nombre y apellidos"
          id="name"
          name="name"
          value={name}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && nameValid}</span> */}

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

        {/* <label htmlFor="">Teléfono</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="teléfono"
          id="phone"
          name="phone"
          value={phone}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && phoneValid}</span> */}

        <label htmlFor="">Contraseña</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="password"
          id="pw"
          name="pw"
          value={pw}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && pwValid}</span>

        <label htmlFor="">Confirmar contraseña</label>
        <input
          className="form-input px-4 py-3 rounded-full"
          type="text"
          placeholder="password"
          id="pw1"
          name="pw1"
          value={pw1}
          onChange={onInputChange}
        />
        <span className='text-[10px] text-end text-team-brown'>{formSubmitted && pw1Valid}</span>

        <div className="flex flex-row-reverse justify-between mt-4">
          <button type='submit' className="bg-team-brown h-10 w-1/2  ml-3 rounded-lg text-team-dark font-medium hover:bg-team-green">
            Registrar
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
