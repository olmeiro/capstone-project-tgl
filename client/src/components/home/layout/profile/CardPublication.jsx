import React, { useEffect, useState } from 'react'
import { Card, Label, Modal, TextInput } from 'flowbite-react'
import { useProfileStore } from '../../../../hooks/useProfileStore'
import { useAuthStore, useForm } from '../../../../hooks'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { onChanging } from '../../../../store'

const formData = {
  comment: ''
}

const formValidations = {
  comment: [(value) => value.length >= 4, 'El comentario debe tener al menos 4 letras']
}

export const CardPublication = ({ userId, date, description, id: postId, likes, photo }) => {
  const { user } = useAuthStore()
  const { changing } = useSelector(state => state.profile)

  const [loginUserId, setIdUser] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [onChangeState, setonChangeState] = useState(null)

  const { comment, commentValid, onInputChange, isFormValid } = useForm(formData, formValidations)

  const {onLoadChanging, deletePostUser } = useProfileStore()

  const deletePhoto = () => {
    Swal.fire({
      title: 'Esta seguro de eliminar publicación?',
      text: 'No puedes revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deletePostUser(postId)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } catch (error) {
          Swal.fire('Algo ha salido mal.')
        }
      }
    })
  }

  const onSubmitCommentPhoto = () => {
    console.log('here')
  }

  useEffect(() => {
    setIdUser(user.id)
    setonChangeState(changing)
    console.log(changing)
  }, [loginUserId, changing])

  return (
    <>
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
      <div className="max-w-sm">
        <Card>
          <div className="flex flex-col items-center pb-10 ">
            <img
              className="mb-3 h-24 w-24  shadow-lg"
              src={photo}
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {description}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {date}
            </span>
            <div className="mt-4 flex space-x-3 lg:mt-6">
              <button
                href="#"
                onClick={deletePhoto}
                className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Eliminar foto
              </button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
