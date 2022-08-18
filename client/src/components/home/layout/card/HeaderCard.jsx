import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { StarIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { Tooltip, Button, Modal, Label, Textarea } from 'flowbite-react'

import { useHomeStore } from '../../../../hooks/useHomeStore'
import { socialApi } from '../../../../api'

export default function HeaderCard ({ setIsOpen, photo, description, likes, date, likeAPost, postId, userId }) {
  const [openModal, setOpenModal] = useState(false)
  const [comment, setComment] = useState('')
  const [userOfPost, setUserOfPost] = useState()

  const { makeAComment, checkCommentsHook, addToFavorites } = useHomeStore()
  const { user } = useSelector((state) => state.auth)

  let entireUser = socialApi
    .get(`/user/byid/${userId}`)
    .then((response) => response.data.body)
  useEffect(() => {
    (async () => {
      entireUser = await entireUser
      setUserOfPost(entireUser)
    })()
  }, [])

  const handleAddFavorite = () => {
    addToFavorites(postId, user.id)
    Swal.fire('¡Publicación agregada a favoritos!')
  }

  const handleComment = (e) => {
    setComment(e.target.value)
  }
  const handleSumit = async () => {
    await makeAComment(postId, comment)
    setComment('')
    checkCommentsHook()
    Swal.fire('Comentario publicado')
    setOpenModal(false)
  }

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
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Deja tu comentario
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="Comentario" />
                </div>
                <Textarea
                  id="comment"
                  placeholder="Escribe el comentario"
                  required={true}
                  onChange={(e) => handleComment(e)}
                  value={comment}
                />
              </div>
              <div className="w-full">
                <Button onClick={() => handleSumit()}>Enviar</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>

      <div className="bg-team-dark rounded-lg ">
        <div className="flex ">
          <div>
            <img
              className="h-16 w-16 rounded-full m-4"
              src={userOfPost && userOfPost.photoProfile}
              alt=""
            />
          </div>
          <div>
            <div className=" text-lg font-medium text-white mt-6">
              {userOfPost && userOfPost.alias}
            </div>
            <div className=" text-sm text-gray-400 inline-block">{date}</div>
          </div>
        </div>
        <div className="ml-6 mb-3 text-sm text-white">{description}</div>
        <div className=" box-content max-w-md mx-auto rounded-br-lg rounded-bl-lg bg-myColor shadow-md overflow-hidden md:max-w-2xl mt-2">
          <div className=" flex justify-center ">
            <img
              className="sm:h-48 sm:w-full object-cover md:h-80 md:w-full "
              src={photo}
              alt="Man looking at item at a store"
            />
          </div>
          <header className="flex justify-around items-center p-3 bg-team-dark">
            <button
              className="bg-black text-team-green sm:text-sm sm:mr-2 rounded px-4 py-1 hover:bg-black  hover:border-team-green "
              onClick={() => setIsOpen(true)}
            >
              Ver comentarios
            </button>
            <div className="flex flex-row w-2/3 justify-end items-center gap-4">
              <Tooltip content="Agregar a favoritos" arrow={false}>
                <button onClick={() => handleAddFavorite()}>
                  <StarIcon
                    className="h-6 w-6 mb-3 relative top-2  rounded-md hover:fill-team-green  hover:text-black "
                    aria-hidden="true"
                  />
                </button>
              </Tooltip>
              <Tooltip content="Comentar" arrow={false}>
                <button>
                  <PlusCircleIcon
                    onClick={() => setOpenModal(true)}
                    className="h-6 w-6 mb-3 relative top-2  rounded-md  hover:fill-team-green  hover:text-black "
                    aria-hidden="true"
                  />
                </button>
              </Tooltip>
            </div>
          </header>
        </div>
      </div>
    </div>
  )
}

HeaderCard.propTypes = {
  setIsOpen: PropTypes.func,
  photo: PropTypes.string,
  description: PropTypes.string,
  likes: PropTypes.number,
  date: PropTypes.string,
  likeAPost: PropTypes.func,
  postId: PropTypes.number,
  userId: PropTypes.number
}
