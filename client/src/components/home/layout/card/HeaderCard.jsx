import React, { useEffect, useState } from 'react'
import {
  StarIcon,
  HeartIcon,
  PlusCircleIcon,
  ThumbUpIcon
} from '@heroicons/react/outline'
import { Tooltip, Button, Modal, Label, Textarea } from 'flowbite-react'
import { useHomeStore } from '../../../../hooks/useHomeStore'
import Swal from 'sweetalert2'
import { socialApi } from '../../../../api'
import { useSelector } from 'react-redux'

export default function HeaderCard({ setIsOpen, photo, description, likes, date, likeAPost, postId, userId }) {
  const [openModal, setOpenModal] = useState(false)
  const [likesRender, setLikesRender] = useState(likes)
  const [comment, setComment] = useState('')
  const { makeAComment, checkCommentsHook, addToFavorites } = useHomeStore()
  const [userOfPost, setUserOfPost] = useState()
  const { user } = useSelector(state => state.auth)

  let entireUser = socialApi.get(`/user/byid/${userId}`).then(response => response.data.body)
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

  const handleLike = () => {
    likeAPost(postId)
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
      <React.Fragment>
        <Modal show={openModal} size="md" popup={true} onClose={() => setOpenModal(false)}>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Deja tu comentario
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="comment"
                    value="Comentario"
                  />
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
                <Button onClick={() => handleSumit()}>
                  Enviar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>

      <div className="bg-team-blue rounded-lg ">
        <div className='flex items-center rounded'>
            <img className="h-16 w-16 p-1 rounded-full" src={userOfPost && userOfPost.photoProfile} alt="" />
            <div>
              <p className='underline leading-3 text-lg antialiased font-extrabold'>{userOfPost && userOfPost.alias.toUpperCase()}</p>
              <p className='text-xs leading-5 italic mt-2'>{ date }</p>
            </div>
        </div>
        <div className='text-left ml-16 italic text tracking-wide'>
          {description}
        </div>
        <div className=" box-content max-w-md mx-auto rounded-br-lg rounded-bl-lg  shadow-md overflow-hidden md:max-w-2xl mt-2">
          <div className=' flex justify-center'>
            <img
              className="sm:h-48 sm:w-full object-cover md:h-80 md:w-full "
              src={photo}
              alt="Man looking at item at a store"
            />
          </div>
          <header className="flex items-center p-4">
            <button
              className="bg-team-dark w-1/3 text-team-green sm:text-sm sm:mr-2 rounded px-4 py-2 hover:text-white"
              onClick={() => setIsOpen(true)}
            >
              Ver comentarios
            </button>
            <div className="flex flex-row w-2/3 justify-end items-center gap-4">
              <Tooltip content="likes" arrow={false}>
                <div>
                  {likesRender}
                </div>
              </Tooltip>
              <Tooltip content="like" arrow={false}>
                <button onClick={() => handleLike()}>
                  <ThumbUpIcon
                    className="h-6 w-6 mb-3 relative top-1  rounded-md  hover:fill-black"
                    aria-hidden="true"
                  />
                </button>
              </Tooltip>
              <Tooltip content="guardar" arrow={false}>
                <button onClick={() => handleAddFavorite()}>
                  <StarIcon
                    className="h-6 w-6 mb-3 relative top-1  rounded-md hover:fill-black"
                    aria-hidden="true"
                  />
                </button>
              </Tooltip>
              <Tooltip content="comentar" arrow={false}>
                <button>
                  <PlusCircleIcon
                    onClick={() => setOpenModal(true)}
                    className="h-6 w-6 mb-3 relative top-1  rounded-md  hover:fill-black hover:text-white"
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
