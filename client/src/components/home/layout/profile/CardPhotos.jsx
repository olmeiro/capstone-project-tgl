import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AiOutlineCloudUpload, AiFillPlusCircle } from 'react-icons/ai'
import { Modal, Label, Tooltip, TextInput, Spinner } from 'flowbite-react'

import { useAuthStore, useForm } from '../../../../hooks'
import { useProfileStore } from '../../../../hooks/useProfileStore'
import { CardPublication } from './CardPublication'

const formData = {
  comment: ''
}

const formValidations = {
  comment: [
    (value) => value.length >= 0,
    'El comentario debe tener al menos 4 letras'
  ]
}

export const CardPhotos = () => {
  const [loginUserId, setIdUser] = useState('')
  const [openModalImg, setOpenModalImg] = useState(false)
  const [imagePublication, setImagePublication] = useState({
    preview: '',
    data: ''
  })

  const { user } = useAuthStore()
  const inputRef = useRef()

  const { comment, commentValid, onInputChange, onResetForm } = useForm(
    formData,
    formValidations
  )
  const { userAlias } = useParams()
  const { sendPublicationUser } = useProfileStore()

  const [formSubmitted, setFormSubmitted] = useState(false)

  const { changing } = useSelector((state) => state.profile)

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    }
    setImagePublication(img)
  }

  const resetFileInput = () => {
    inputRef.current.value = null
    setImagePublication({ preview: '', data: '' })
  }

  const onHandleSubmitPublication = async (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (imagePublication.data === '') {
      Swal.fire('Es necesario subir una imagen.')
      onResetForm()
      setOpenModalImg(false)
      return
    }
    sendPublicationUser(loginUserId, comment, imagePublication.data)
    resetFileInput()
    setOpenModalImg(false)
  }

  useEffect(() => {
    setIdUser(user.id)
  }, [loginUserId, changing])

  if (changing) {
    return (
      <div className="flex justify-center sm:h-[49vh] h-[40vh] items-center bg-team-blue">
        <div className="text-center">
          <Spinner size="lg" aria-label="Center-aligned spinner example" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-4 mt-3 mb-3 justify-center flex-wrap ">
      <>
        <Modal
          show={openModalImg}
          size="md"
          popup={true}
          onClose={() => setOpenModalImg(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <form onSubmit={onHandleSubmitPublication}>
              <div className="flex flex-col justify-center">
                <h2 className="text-center font-semibold">
                  Agrega foto y comentario de publicación
                </h2>
                <div className="flex flex-col justify-center mb-5 ">
                  <input
                    type="file"
                    name="file"
                    ref={inputRef}
                    className="invisible"
                    onChange={handleFileChange}
                  />
                  <Tooltip
                    className="flex justify-center"
                    content="agregar foto"
                    arrow={false}
                  >
                    <AiOutlineCloudUpload
                      className="w-12 h-12 md:ml-[170px] sm:ml-[95px] hover:bg-team-green rounded-md"
                      onClick={() => inputRef.current.click()}
                    />
                  </Tooltip>
                </div>
                <div className="flex justify-center mb-3">
                  {imagePublication.preview && (
                    <img
                      src={imagePublication.preview}
                      width="100"
                      height="100"
                    />
                  )}
                </div>
                <hr></hr>
                <div className="flex flex-col">
                  <Label htmlFor="comment">Comentario</Label>

                  <TextInput
                    name="comment"
                    value={comment}
                    onChange={onInputChange}
                    placeholder="Agrega tu comentario"
                  />

                  <span className="text-[10px] text-end text-team-blue">
                    {formSubmitted && commentValid}
                  </span>
                </div>
                <button
                  className="bg-team-blue h-10 p-2 m-4 rounded-lg hover:bg-team-brown font-semibold"
                  type="submit"
                >
                  Enviar publicación
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>

      {userAlias
        ? null
        : (
        <div className="min-w-full flex justify-center items-center">
          <Tooltip content="agregar publicación" arrow={false}>
            <AiFillPlusCircle
              className="w-12 h-12 rounded-full hover:bg-team-blue hover:text-white "
              onClick={() => setOpenModalImg(true)}
            />
          </Tooltip>
        </div>
          )}
      <div>
        <CardPublication />
      </div>
    </div>
  )
}
