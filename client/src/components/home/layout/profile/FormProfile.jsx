import React, { useEffect, useState } from 'react'
import { Label, TextInput } from 'flowbite-react'
import PropTypes from 'prop-types'

import { useAuthStore, useForm } from '../../../../hooks'
import { useProfileStore } from '../../../../hooks/useProfileStore'

const formData = {
  alias: '',
  name: '',
  bio: '',
  email: '',
  phone: ''
}

const formValidations = {
  alias: [
    (value) => {
      const regex = /[a-zA-Z][a-zA-Z0-9-_]{3,32}/
      const regexAlias = regex.test(value)
      return regexAlias
    },
    'El alias de usuario tener al menos 4 caracteres, pueden ser letras con números.'
  ],
  bio: [(value) => value.length >= 4, 'La bio debe tener al menos 4 palabras'],
  name: [
    (value) => {
      const regex = /^[a-z\s]+$/i
      const regexName = regex.test(value)
      return regexName
    },
    'Se require primer nombre y primer apellido. Sólo letras.'
  ],
  email: [
    (value) => {
      const regex =
        /[a-z0-9]+[_a-z0-9/.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/gi
      const regexEmail = regex.test(value)
      return regexEmail
    },
    'El email es incorrecto.'
  ],
  phone: [
    (value) => {
      // value.length >= 7
      const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
      const testRegex = regex.test(value)
      return testRegex
    },
    'El número de contacto es número móvil de 10 dígitos.'
  ]
}

export const FormProfile = ({ close }) => {
  const { user } = useAuthStore()
  const { changeDataProfile, profile } = useProfileStore()

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [idUser, setIdUser] = useState()

  const { alias, name, bio, email, phone, aliasValid, nameValid, bioValid, emailValid, phoneValid, onInputChange, isFormValid } = useForm(formData, formValidations)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    if (isFormValid) {
      changeDataProfile({ idUser, alias, name, bio, email, phone })
      close(false)
    }
  }

  useEffect(() => {
    setIdUser(user.id)
  }, [profile, user.id])

  return (
    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Editar datos de perfil
      </h3>
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
          <span className="text-[10px] text-end text-team-brown">
            {formSubmitted && aliasValid}
          </span>
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
          <span className="text-[10px] text-end text-team-brown">
            {formSubmitted && nameValid}
          </span>
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
          <span className="text-[10px] text-end text-team-brown">
            {formSubmitted && bioValid}
          </span>
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
          <span className="text-[10px] text-end text-team-brown">
            {formSubmitted && emailValid}
          </span>
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
          <span className="text-[10px] text-end text-team-brown">
            {formSubmitted && phoneValid}
          </span>
        </div>
        <div>
          <button
            type="submit"
            className="w-full mt-5 h-10 rounded-lg text-white hover:bg-team-dark bg-team-blue"
          >
            Editar
          </button>
        </div>
      </form>
    </div>
  )
}

FormProfile.propTypes = {
  close: PropTypes.func
}
