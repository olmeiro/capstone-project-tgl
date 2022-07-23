import React, { useState } from 'react'
import {
  StarIcon,
  HeartIcon,
  PlusCircleIcon,
  ThumbUpIcon
} from '@heroicons/react/outline'
import { Tooltip, Button, Modal, Label, Textarea } from 'flowbite-react'

export default function HeaderCard ({ setIsOpen }) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div>
      <React.Fragment>
        <Modal show={openModal} size="md" popup={true} onClose={() => setOpenModal(false)}>
          <Modal.Header />
          <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Deja tu comentario
        </h3>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="comment"
              value="Comentario"
            />
          </div>
          <Textarea
            id="comment"
            placeholder="Escribe el comentario"
            required={true}
          />
        </div>
        <div className="w-full">
          <Button>
            Enviar
          </Button>
        </div>
      </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>

      <div>
        <div className="box-content max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-2">
          <img
            className="h-20 w-full object-contain md:h-full md:w-full sm:h-full sm:w-full "
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Man looking at item at a store"
          />
          <header className="flex justify-around items-center p-4 bg-team-blue">
            <button
              className="bg-team-dark text-team-green sm:text-sm sm:mr-2 rounded px-4 py-1"
              onClick={() => setIsOpen(true)}
            >
              Comentarios
            </button>
            <div className="flex flex-row gap-4">
              <Tooltip content="Foto linda" arrow={false}>
                <ThumbUpIcon
                  className="h-6 w-6 mb-3 relative top-1  rounded-md"
                  aria-hidden="true"
                />
              </Tooltip>
              <Tooltip content="Me enamora" arrow={false}>
                <HeartIcon
                  className="h-6 w-6 mb-3 relative top-1  rounded-md"
                  aria-hidden="true"
                />
              </Tooltip>
              <Tooltip content="guardar" arrow={false}>
                <StarIcon
                  className="h-6 w-6 mb-3 relative top-1  rounded-md"
                  aria-hidden="true"
                />
              </Tooltip>
              <Tooltip content="comentar" arrow={false}>
                <PlusCircleIcon
                  onClick={() => setOpenModal(true)}
                  className="h-6 w-6 mb-3 relative top-1  rounded-md"
                  aria-hidden="true"
                />
              </Tooltip>
            </div>
          </header>
        </div>
      </div>
    </div>
  )
}
