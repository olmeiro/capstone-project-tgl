import React, { useState } from 'react'
import { Card, Modal, Label, TextInput } from 'flowbite-react'

import { useForm } from '../../../../hooks'

const formData = {
  comment: ''
}

const formValidations = {
  comment: [(value) => value.length >= 4, 'El comentario debe tener al menos 4 letras']
}

export const CardPhotos = () => {
  const [openModal, setOpenModal] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { comment, commentValid, onInputChange, isFormValid } = useForm(formData, formValidations)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (isFormValid) {
      console.log('enviando comentario')
      // sendCommentPhoto()
    }
  }

  const deletePhoto = () => {
    console.log('eliminando foto')
  }

  return (
  <div className="flex gap-4 mt-3 mb-3 justify-center flex-wrap">
      <React.Fragment>
        <Modal
          show={openModal}
          size="md"
          popup={true}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <form onSubmit={onSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Agrega tu comentario" />
              </div>
              <TextInput
                name="comment"
                value={comment}
                onChange={onInputChange}
                placeholder="Agrega tu comentario"
              />
              <span className='text-[10px] text-end text-team-brown'>{formSubmitted && commentValid}</span>
            </div>
            <div className='w-full flex justify-end'>
              <button className='bg-team-blue h-10 p-2 m-4 rounded-lg hover:bg-team-brown' type='submit'>Enviar comentario</button>
            </div>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
     <Card>
       <div className="flex flex-col items-center pb-10">
         <img
           className="mb-3 h-24 w-24 rounded-full shadow-lg"
           src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
           alt="Bonnie image"
         />
         <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
           Bonnie Green
         </h5>
         <span className="text-sm text-gray-500 dark:text-gray-400">
           Visual Designer
         </span>
         <div className="mt-4 flex space-x-3 lg:mt-6">
           <button
             href="#"
             onClick={deletePhoto}
             className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
           >
             Eliminar foto
           </button>
           <button
             onClick={() => setOpenModal(true)}
             className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
           >
             Comentar
           </button>
         </div>
       </div>
     </Card>
    </div>
  )
}
