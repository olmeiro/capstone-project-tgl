import React, { useState } from 'react'
import { Tooltip, Button, Modal, Label, TextInput } from 'flowbite-react'
import { AdjustmentsIcon } from '@heroicons/react/outline'

const person = [
  {
    name: 'Calvin Hawkins',
    email: 'calvin.hawkins@example.com',
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
]

const imagePath = '/assets/model.avif'

export const Header = ({ children }) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div>
      <React.Fragment>
        <Modal
          show={openModal}
          size="md"
          popup={true}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
           { children }
          </Modal.Body>
        </Modal>
      </React.Fragment>
      <div className="h-20 flex flex-row justify-around items-center bg-team-green ">
        <img
          className="md:h-16 md:w-16 sm:h-10 sm:w-10 rounded-full divide-gray-200"
          src={imagePath}
          alt=""
        />
        <p>Esta es una breve descripción sobre mí.</p>
        <Tooltip content="Editar" arrow={false}>
          <Button
            className="hover:bg-team-brown"
            onClick={() => setOpenModal(true)}
          >
            <AdjustmentsIcon
              className="h-6 w-6 mb-3 relative top-1  rounded-md"
              aria-hidden="true"
            />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}
