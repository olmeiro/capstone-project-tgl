import React, { useEffect, useState } from 'react'
import { Label, TextInput } from 'flowbite-react'

import { useForm } from '../../../../hooks'
import Swal from 'sweetalert2'
import { useProfileStore } from '../../../../hooks/useProfileStore'

const formData = {
  alias: '',
  name: '',
  bio: '',
  email: '',
  phone: '',
  password: '',
  password1: ''
}

const formValidations = {
  alias: [(value) => value.length >= 4, 'El alias de usuario tener al menos 4 caracteres'],
  name: [(value) => value.length >= 4, 'El nombre debe tener al menos 4 caracteres'],
  bio: [(value) => value.length >= 4, 'La bio debe tener al menos 4 palabras'],
  email: [(value) => value.includes('@'), 'El email es obligatorio'],
  phone: [(value) => value.length >= 7, 'El número de telefono es númerico de 7 digitos'],
  password: [(value) => value.length >= 6, 'El password es numerico de 6 digitos'],
  password1: [(value) => value.length >= 6, 'El password es numerico de 6 digitos']
}

export const FormProfile = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const { changeDataProfile, profileData } = useProfileStore()

  const { alias, name, bio, email, phone, password, password1, aliasValid, nameValid, bioValid, emailValid, phoneValid, passwordValid, password1Valid, onInputChange, isFormValid } = useForm(formData, formValidations)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    if (password !== password1) {
      return Swal.fire('Contraseñas no coinciden', 'error')
    }

    if (isFormValid) {
      changeDataProfile({ alias, name, bio, email, phone, password })
    }
  }

  useEffect(() => {
  }, [profileData])

  return (
      <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Editar datos de perfil
        </h3>
        <div>
          <form onSubmit={onSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="alias" value="Alias" />
              </div>
              <TextInput
                name="alias"
                value={alias}
                onChange={onInputChange}
                placeholder="Alias o nickname"
              />
               <span className='text-[10px] text-end text-team-brown'>{formSubmitted && aliasValid}</span>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nombre Completo" />
              </div>
              <TextInput
                name="name"
                value={name}
                onChange={onInputChange}
                placeholder="nombre completo"
              />
               <span className='text-[10px] text-end text-team-brown'>{formSubmitted && nameValid}</span>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="bio" value="Bio" />
              </div>
              <TextInput
                name="bio"
                value={bio}
                onChange={onInputChange}
                placeholder="Pequeña bio"
              />
               <span className='text-[10px] text-end text-team-brown'>{formSubmitted && bioValid}</span>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Correo electrónico" />
              </div>
              <TextInput
                name="email"
                value={email}
                onChange={onInputChange}
                placeholder="name@company.com"
              />
               <span className='text-[10px] text-end text-team-brown'>{formSubmitted && emailValid}</span>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Teléfono" />
              </div>
              <TextInput
                name="phone"
                value={phone}
                onChange={onInputChange}
                placeholder="telefono"
                 />
               <span className='text-[10px] text-end text-team-brown'>{formSubmitted && phoneValid}</span>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                name="password"
                value={password}
                onChange={onInputChange}
                type="password"
                 />
               <span className='text-[10px] text-end text-team-brown'>{formSubmitted && passwordValid}</span>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="confirmar password" />
              </div>
              <TextInput
                name="password1"
                value={password1}
                onChange={onInputChange}
                type="password"
              />
               <span className='text-[10px] text-end text-team-brown'>{formSubmitted && password1Valid}</span>
            </div>
            <div className="w-full mt-5">
              <button
                type="submit"
                className="w-full h-10 rounded-lg text-white hover:bg-team-dark bg-team-blue"
              >
                Editar
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
