import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Card, Modal, Label, TextInput } from 'flowbite-react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

import { useAuthStore, useForm } from '../../../../hooks'
import { useHomeStore } from '../../../../hooks/useHomeStore'
import { useProfileStore } from '../../../../hooks/useProfileStore'
import { useFriendStore } from '../../../../hooks/useFriendStore'
import photoDefault from '../../../../../assets/photoDefault.png'

const formData = {
  comment: ''
}

const formValidations = {
  comment: [
    (value) => value.length >= 4,
    'El comentario debe tener al menos 4 letras'
  ]
}

export const CardPhotosFriends = () => {
  const [idUser, setIdUser] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openModalImg, setOpenModalImg] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [images, setImages] = useState({ data: '' })

  const inputFiles = useRef()
  const { comment, commentValid, onInputChange, isFormValid } = useForm(
    formData,
    formValidations
  )
  const { user } = useAuthStore()
  const { loadingPhotoUser, uploadCommentPhoto } = useProfileStore()

  const { friends } = useSelector((state) => state.friends)
  const { deleteFriendHook } = useFriendStore()
  const { setLastUserVisitedHook } = useHomeStore()

  const handleLastUserVisited = (userAlias, userId) => {
    setLastUserVisitedHook(userAlias, userId)
  }

  const handleDeleteFriend = (friendId) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar este amigo?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFriendHook(friendId)
        Swal.fire('Eliminado!', 'Amigo eliminado.', 'success')
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (isFormValid) {
      uploadCommentPhoto(comment, idUser)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files === 0) return
    const img = {
      data: e.target.files[0]
    }
    setImages(img)
  }

  const uploadPhotosUser = (e) => {
    e.preventDefault()
    loadingPhotoUser(images.data)
  }

  useEffect(() => {
    setIdUser(user.id)
  }, [])

  return (
    <div className="flex gap-4 mt-3 mb-3 justify-center flex-wrap ">
      <>
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
                <span className="text-[10px] text-end text-team-brown">
                  {formSubmitted && commentValid}
                </span>
              </div>
              <div className="w-full flex justify-end">
                <button
                  className="bg-team-blue h-10 p-2 m-4 rounded-lg hover:bg-team-brown"
                  type="submit"
                >
                  Enviar comentario
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
      <>
        <Modal
          show={openModalImg}
          size="md"
          popup={true}
          onChange={handleFileChange}
          onClose={() => setOpenModalImg(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <form onSubmit={uploadPhotosUser}>
              <div className="flex flex-col justify-center">
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="Agrega tus fotos" />
                </div>
                <input type="file" ref={inputFiles} className="invisible" />
                <AiOutlineCloudUpload
                  className="w-12 h-12 m-auto hover:bg-team-green rounded-md"
                  onClick={() => inputFiles.current.click()}
                />
              </div>
              <div className="w-full flex justify-end">
                <button
                  className="bg-team-blue h-10 p-2 m-4 rounded-lg hover:bg-team-brown"
                  type="submit"
                >
                  Enviar fotos
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>

      {friends.length === 0
        ? (
        <div className="flex flex-col justify-center items-center h-[49vh] m-4">
          <h3 className="text-xl text-team-blue font-bold text-center">
            Agrega nuevos amigos en la pestaña
            <Link to="/" className="underline ml-4 hover:cursor-pointer">
              TEAM
            </Link>
          </h3>
        </div>
          )
        : (
            friends.map((friend) => {
              return (
            <Card key={friend.id}>
              <div className="flex flex-col items-center justify-center pb-10 ">
                <Link
                  to={`/profile/${friend.alias}`}
                  onClick={() => handleLastUserVisited(friend.alias, friend.id)}
                >
                  <img
                    className="bg flex mb-3 h-24 w-24 justify-center mx-auto rounded-full shadow-lg"
                    src={
                      friend.photoProfile ? friend.photoProfile : photoDefault
                    }
                    alt="Bonnie image"
                  />
                  <h5 className="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
                    {friend.alias}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {friend.email}
                  </span>
                </Link>
                <div className="mt-4 flex space-x-3 lg:mt-6">
                  <button
                    href="#"
                    onClick={() => handleDeleteFriend(friend.id)}
                    className="inline-flex items-center rounded-lg bg-red-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Eliminar amigo
                  </button>
                </div>
              </div>
            </Card>
              )
            })
          )}
    </div>
  )
}
