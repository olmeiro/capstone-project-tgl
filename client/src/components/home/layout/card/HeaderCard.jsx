import React, { useEffect, useState } from 'react'
import {
  StarIcon,
  HeartIcon,
  PlusCircleIcon,
  ThumbUpIcon
} from '@heroicons/react/outline'
import { Tooltip, Button, Modal, Label, Textarea } from 'flowbite-react'
import { useHomeStore } from '../../../../hooks/useHomeStore';

export default function HeaderCard({ setIsOpen, photo, description, likes, date, likeAPost, postId }) {
  const [openModal, setOpenModal] = useState(false)
  const [likesRender, setLikesRender] = useState(likes);
  const [comment, setComment] = useState("")

  const { makeAComment, checkCommentsHook } = useHomeStore();

  const handleLike = () => {
    likeAPost(postId)
  }
  const handleComment = (e) => {
    setComment(e.target.value)
  }
  const handleSumit = async () => {
    await makeAComment(postId, comment);
    checkCommentsHook();
    alert("Comentario publicado")
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

      <div>
        <div className="box-content max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-2">
          <img
            className="h-20 w-full object-contain md:h-80 md:w-80 sm:h-80 sm:w-80 "
            src={photo}
            alt="Man looking at item at a store"
          />
          <header className="flex justify-around items-center p-4 bg-team-blue">
            <div>
              {description}
            </div>
            <button
              className="bg-team-dark text-team-green sm:text-sm sm:mr-2 rounded px-4 py-1"
              onClick={() => setIsOpen(true)}
            >
              Comentarios
            </button>
            <div className="flex flex-row gap-4">
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
                <StarIcon
                  className="h-6 w-6 mb-3 relative top-1  rounded-md hover:fill-black"
                  aria-hidden="true"
                />
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
