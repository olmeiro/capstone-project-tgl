import React, { useEffect, useRef, useState } from 'react'
import { Card, Modal, Label, TextInput, Tooltip } from 'flowbite-react'
import { AiOutlineCloudUpload, AiFillPlusCircle } from 'react-icons/ai'

import { useAuthStore, useForm } from '../../../../hooks'
import { useProfileStore } from '../../../../hooks/useProfileStore'
import { useSelector } from 'react-redux'
import { CardPublication } from './CardPublication'
import { useParams } from 'react-router-dom'

const formData = {
  comment: ''
}

const formValidations = {
  comment: [(value) => value.length >= 4, 'El comentario debe tener al menos 4 letras']
}

export const CardPhotos = () => {
  const [loginUserId, setIdUser] = useState('')
  const [openModalImg, setOpenModalImg] = useState(false)
  const [imagePublication, setImagePublication] = useState({ preview: '', data: '' })

  const inputRef = useRef()
  const { userAlias } = useParams();
  const { user } = useAuthStore()
  const { loadingPublicationUser, sendPublicationUser } = useProfileStore()

  const { publications } = useSelector(state => state.profile)
  const { lastUserVisited } = useSelector(state => state.home)

  const { comment, commentValid, onInputChange, isFormValid } = useForm(formData, formValidations)
  const [formSubmitted, setFormSubmitted] = useState(false)

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
      sendPublicationUser(loginUserId, comment, imagePublication.data)
    }
    setOpenModalImg(false)
  }

  useEffect(() => {
    setIdUser(user.id)
    loadingPublicationUser(loginUserId)
  }, [loginUserId])

  return (
    <div className="flex gap-4 mt-3 mb-3 justify-center flex-wrap ">
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
      {
        userAlias
          ? null
          : <div className='min-w-full bg-team-brown flex justify-center items-center'>
            <p className='mr-2'>Agregar publicación</p>
            <Tooltip content="agregar publicación" arrow={false}>
              <AiFillPlusCircle
                className='w-10 h-10 rounded-full hover:bg-team-blue hover:text-white '
                onClick={() => setOpenModalImg(true)}
              />
            </Tooltip>
          </div>
      }


      {
        userAlias
          ? lastUserVisited && lastUserVisited.posts.map(post => {
            return (
              <CardPublication
                key={post.id}
                userId={post.UserId}
                date={post.date}
                description={post.description}
                id={post.id}
                likes={post.likes}
                photo={post.photo}
              />
            )
          })
          : publications.length === 0
            ? null
            : publications.map(publication => <CardPublication
              key={publication.id}
              userId={publication.UserId}
              date={publication.date}
              description={publication.description}
              id={publication.id}
              likes={publication.likes}
              photo={publication.photo}
            />)
      }

    </div>
  )
}
