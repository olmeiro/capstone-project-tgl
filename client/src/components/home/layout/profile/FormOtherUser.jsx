import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'

export const FormOtherUser = () => {
  return (
    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Deseas agregar amistad?
      </h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="message" value="Deja tu mensaje:" />
        </div>
        <TextInput id="message" placeholder="Mensaje" required={false} />
      </div>
      <div className="w-full">
        <Button>Agregar amistad</Button>
      </div>
    </div>
  )
}
