import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'

export const FormProfile = () => {
  return (
    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
      Edita la información de tu perfil
    </h3>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="user" value="Usuario" />
      </div>
      <TextInput
        id="user"
        placeholder="nombre de usuario"
        required={false}
      />
    </div>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="name" value="Nombre completo" />
      </div>
      <TextInput
        id="name"
        placeholder="nombre completo"
        required={false}
      />
    </div>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="email" value="Correo electrónico" />
      </div>
      <TextInput
        id="email"
        placeholder="name@company.com"
        required={false}
      />
    </div>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="password" value="Your password" />
      </div>
      <TextInput id="password" type="password" required={true} />
    </div>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="confirmPassword" value="confirmar password" />
      </div>
      <TextInput id="confirmPassword" type="password" required={true} />
    </div>
    <div className="w-full">
      <Button>Editar</Button>
    </div>
  </div>
  )
}
