import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Tooltip, Button, Modal, Label } from 'flowbite-react'
import { AdjustmentsIcon } from '@heroicons/react/outline'
import { AiFillTool, AiOutlineCloudUpload } from 'react-icons/ai'

import photoDefault from '../../../../../assets/photoDefault.png'
import { useProfileStore } from '../../../../hooks/useProfileStore'
import { useAuthStore } from '../../../../hooks'
import { FormProfile } from './FormProfile'
const imagePath = '/assets/model.avif'

export const Header = () => {
  const { user } = useAuthStore()
  const { loadingPhotoProfile, profile } = useProfileStore()

  const [bio, setBio] = useState('Esta es la decripción de tu perfil')
  const [image, setImage] = useState({ preview: '', data: '' })
  const [imageProfile, setImageProfile] = useState(imagePath)
  const [openModal, setOpenModal] = useState(false)
  const [modalImg, setModalImg] = useState(false)
  const [idUser, setIdUser] = useState('')
  const inputRef = useRef()

  const { userAlias } = useParams()
  const { lastUserVisited } = useSelector((state) => state.home)

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    }
    setImage(img)
  }
  const onHandleSubmit = async (e) => {
    e.preventDefault()
    loadingPhotoProfile(image.data, idUser)
    setModalImg(false)
  }

  useEffect(() => {
    setIdUser(user.id)
    setImageProfile(profile.photoProfile)
    setBio(profile.bio)
  }, [user.id, profile.photoProfile, profile.bio])

  return (
    <div>
      <>
        <Modal
          show={openModal}
          size="md"
          popup={true}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <FormProfile close={setOpenModal} />
          </Modal.Body>
        </Modal>
      </>
      <>
        <Modal
          show={modalImg}
          size="md"
          popup={true}
          onClose={() => setModalImg(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="flex flex-col justify-center items-center">
              <Label htmlFor="name" value="Elige foto de perfil" />
              <AiOutlineCloudUpload
                className="w-12 h-12 m-10 hover:bg-team-green rounded-md"
                onClick={() => inputRef.current.click()}
              />
              <h1>Upload to server</h1>
              {image.preview && (
                <img src={image.preview} width="100" height="100" />
              )}
              <hr></hr>
              <form onSubmit={onHandleSubmit}>
                <input
                  type="file"
                  name="file"
                  className="invisible"
                  ref={inputRef}
                  onChange={handleFileChange}
                />
                <div className="flex justify-end">
                  <button className="bg-team-blue p-4 rounded-lg">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>

      <div className="h-20 flex flex-row justify-around items-center bg-team-green ">
        <div className="flex flex-col mt-3">
          <img
            className="md:h-16 md:w-16 sm:h-10 sm:w-10 rounded-full divide-gray-200"
            src={
              userAlias
                ? lastUserVisited && lastUserVisited.photoProfile == null
                  ? photoDefault
                  : lastUserVisited && lastUserVisited.photoProfile
                : imageProfile === '' || imageProfile === null
                  ? imagePath
                  : imageProfile
            }
            alt="foto de perfil"
          />
          {userAlias
            ? null
            : (
            <AiFillTool
              className="relative left-10 bottom-4 bg-team-blue rounded-lg sm:left-8 sm:bottom-2"
              onClick={() => setModalImg(true)}
            />
              )}
        </div>
        {userAlias
          ? (
          <p className="sm:text-xs">
            {' '}
            {lastUserVisited && lastUserVisited.bio
              ? lastUserVisited.bio
              : 'Usuario sin bio todavia'}
          </p>
            )
          : (
          <p className="sm:text-xs md:text-lg sm:w-40 md:w-auto">
            {bio === '' || bio === null ? 'Usuario sin bio todavia' : bio}
          </p>
            )}

        {userAlias
          ? null
          : (
          <Tooltip content="Editar" arrow={false}>
            <Button
              className="hover:bg-team-brown sm:h-4 sm:w-4"
              onClick={() => setOpenModal(true)}
            >
              <AdjustmentsIcon
                className="h-6 w-6 mb-3 relative top-1  rounded-md sm:h-4 sm:w-4"
                aria-hidden="true"
              />
            </Button>
          </Tooltip>
            )}
      </div>
    </div>
  )
}
