import React, { useRef, useState } from 'react'
import { Tooltip, Button, Modal, Label } from 'flowbite-react'
import { AdjustmentsIcon } from '@heroicons/react/outline'
import { AiFillTool, AiOutlineCloudUpload } from 'react-icons/ai'
import { FormProfile } from './FormProfile'
import { useProfileStore } from '../../../../hooks/useProfileStore'
import { useAuthStore } from '../../../../hooks'

const imagePath = '/assets/model.avif'

export const Header = () => {
  const [openModal, setOpenModal] = useState(false)
  const [modalImg, setModalImg] = useState(false)
  const [image, setImage] = useState({ preview: '', data: '' })

  const { user } = useAuthStore()

  const { loadingPhotoProfile } = useProfileStore()

  const inputRef = useRef()

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    }
    setImage(img)
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    // const img = e.target.firstElementChild.files
    loadingPhotoProfile(image.data, user.id)
  }

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
            <FormProfile />
          </Modal.Body>
        </Modal>
      </React.Fragment>
      <React.Fragment>
        <Modal
          show={modalImg}
          size="md"
          popup={true}
          onClose={() => setModalImg(false)}
        >
          <Modal.Header />
          <Modal.Body>
          <div className='flex flex-col justify-center items-center'>
              <Label htmlFor="name" value="Elige foto de perfil" />
              <AiOutlineCloudUpload
                className='w-12 h-12 m-10 hover:bg-team-green rounded-md'
                onClick={() => inputRef.current.click()}
              />
              <h1>Upload to server</h1>
              {image.preview && <img src={image.preview} width='100' height='100' />}
              <hr></hr>
              <form onSubmit={onHandleSubmit}>
                <input
                  type='file'
                  name='file'
                  className='invisible'
                  ref={inputRef}
                  onChange={handleFileChange}
                />
                <div className='flex justify-end'>
                  <button className='bg-team-blue p-4 rounded-lg'>Enviar</button>
                </div>
              </form>
          </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>

      <div className="h-20 flex flex-row justify-around items-center bg-team-green ">
        <div className='flex flex-col mt-3'>
          <img
            className="md:h-16 md:w-16 sm:h-10 sm:w-10 rounded-full divide-gray-200"
            src={imagePath}
            alt=""
          />
          <AiFillTool
            className='relative left-12 bottom-4 bg-team-blue rounded-lg'
            onClick={() => setModalImg(true)}
          />
        </div>
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
