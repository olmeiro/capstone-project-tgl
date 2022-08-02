import React, { useEffect, useRef, useState } from 'react'
import { Card, Modal, Label, TextInput, Tooltip } from 'flowbite-react'
import { AiOutlineCloudUpload, AiFillPlusCircle } from 'react-icons/ai'

import { useAuthStore, useForm } from '../../../../hooks'
import { useProfileStore } from '../../../../hooks/useProfileStore'

const formData = {
  comment: ''
}

const formValidations = {
  comment: [(value) => value.length >= 4, 'El comentario debe tener al menos 4 letras']
}

export const CardPhotos = () => {
  const [loginUserId, setIdUser] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openModalImg, setOpenModalImg] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [imagePublication, setImagePublication] = useState({ preview: '', data: '' })

  const inputRef = useRef()

  const { comment, commentValid, onInputChange, isFormValid } = useForm(formData, formValidations)

  const { user } = useAuthStore()
  const { loadingPublicationUser, deletePhotoUser } = useProfileStore()

  const deletePhoto = () => {
    // necesito id foto
    deletePhotoUser(loginUserId)
  }

  const onSubmitCommentPhoto = () => {
    console.log('here')
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    } 
    setImagePublication(img)
  }

  const onHandleSubmitPublication = async (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (isFormValid) {
      loadingPublicationUser(loginUserId, comment, imagePublication.data)
    }
    setOpenModalImg(false)
  }

  useEffect(() => {
    setIdUser(user.id)
  }, [user.id])

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
            <form onSubmit={onSubmitCommentPhoto}>
            <div>
                <Label htmlFor="comment" value="Agrega tu comentario" />
              <TextInput
                name="comment"
                value={comment}
                onChange={onInputChange}
                placeholder="Agrega tu comentario"
              />
              <span className='text-[10px] text-end text-team-brown'>{formSubmitted && commentValid}</span>
            </div>
              <button className='bg-team-blue h-10 p-2 m-4 rounded-lg hover:bg-team-brown' type='submit'>Enviar comentario</button>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
      <React.Fragment>
        <Modal
          show={openModalImg}
          size="md"
          popup={true}
          onClose={() => setOpenModalImg(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <form onSubmit={onHandleSubmitPublication}>
              <div className='flex flex-col justify-center'>
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="Agrega foto y comentario de publicación" />
                </div>
                <div className='flex flex-row justify-center mb-5 '>
                  <label>Agregar foto</label>
                  <input
                    type='file'
                    ref={inputRef}
                    className='invisible'
                    onChange={handleFileChange}
                    />
                  <AiOutlineCloudUpload
                    className='w-12 h-12 m-auto hover:bg-team-green rounded-md'
                    onClick={() => inputRef.current.click()}
                    />
                </div>
                <div className='flex justify-center'>
                  {imagePublication.preview && <img src={imagePublication.preview} width='100' height='100' />}
                </div>
                <hr></hr>
                <div className='flex flex-col'>
                  <label htmlFor="comment">Comentario</label>
                  <input
                    name="comment"
                    value={comment}
                    onChange={onInputChange}
                    placeholder="Agrega tu comentario"
                  />
                </div>
              </div>
              <button
                className='bg-team-blue h-10 p-2 m-4 rounded-lg hover:bg-team-brown'
                type='submit'>Enviar publicación
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>

   <div className='min-w-full bg-team-brown flex justify-center items-center'>
    <p className='mr-2'>Agregar publicación</p>
     <Tooltip content="agregar publicación" arrow={false}>
        <AiFillPlusCircle
          className='w-10 h-10 rounded-full hover:bg-team-blue hover:text-white '
          onClick={() => setOpenModalImg(true)}
        />
      </Tooltip>
   </div>

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
