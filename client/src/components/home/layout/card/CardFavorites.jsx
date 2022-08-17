import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { Modal } from 'flowbite-react'

import { useHomeStore } from '../../../../hooks/useHomeStore'
import photoDefault from '../../../../../assets/photoDefault.png'

export const CardFavorites = () => {
  const { deleteComment, getCommentsByPost, deleteFavoriteHook, getFavoritesHook, checkFavoritesHook, checkCommentsHook } = useHomeStore()
  const { favorites, checkFavorites } = useSelector((state) => state.home)

  const [favoriteToRender, setFavoriteToRender] = useState()
  const [openModalImg, setOpenModalImg] = useState(false)
  const [photoFavorite, setPhotoFavorite] = useState()
  const [comments, setComments] = useState()
  const { user } = useSelector((state) => state.auth)
  const userId = user.id

  const { checkComments } = useSelector((state) => state.home)
  const [idFavoriteState, setIdFavoriteState] = useState()

  const getComments = async (idFavorite) => {
    const getComments = await getCommentsByPost(idFavorite)
    setComments(getComments)
  }

  useEffect(() => {
    getComments(idFavoriteState)
  }, [checkComments])

  const handleDeleteComment = (commentId) => {
    Swal.fire({
      title: '¿estas seguro de eliminar este comentario?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment(commentId)
        checkCommentsHook()
        Swal.fire('Eliminado!', 'El comentario ha sido eliminado.', 'success')
      }
    })
  }

  const handleDeleteFavorite = async (postId) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar este favorito?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFavoriteHook(postId)
        await getFavoritesHook()
        checkFavoritesHook()
        Swal.fire('Eliminado!', 'El favorito ha sido eliminado.', 'success')
      }
    })
  }

  useEffect(() => {
    setFavoriteToRender(favorites)
  }, [favorites, checkFavorites])

  return (
    <div className="flex  flex-wrap justify-center gap-6 m-1">
      <Modal
        show={openModalImg}
        size="md"
        popup={true}
        onClose={() => setOpenModalImg(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col justify-center">
            <div className='flex justify-center mb-2'>
              <img className='rounded-md' src={photoFavorite && photoFavorite} alt="" />
            </div>

            {comments && comments.length === 0
              ? (
                <div role="status" className="flex justify-center mt-5">
                  <p>Esta publicación aún no tiene comentarios.</p>
                </div>
                )
              : (
                <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {comments &&
                    comments.map((comment) => {
                      return (
                        <li className="py-3 sm:py-4" key={comment.id}>
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                className="w-8 h-8 rounded-full"
                                src={
                                  comment.user.photoProfile
                                    ? comment.user.photoProfile
                                    : photoDefault
                                }
                                alt="image not found"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {comment.user.alias}
                              </p>
                              <div className="font-normal text-gray-700 dark:text-gray-400">
                                <div className="text-ellipsis">
                                  {comment.comment}
                                </div>
                                <p className="text-xs">{comment.date}</p>
                              </div>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              {userId === comment.UserId
                                ? (
                                <button
                                  onClick={() =>
                                    handleDeleteComment(comment.id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                                  )
                                : null}
                            </div>
                          </div>
                        </li>
                      )
                    })}
                </ul>
              </div>
                )}
          </div>
        </Modal.Body>
      </Modal>
      {favoriteToRender &&
        favoriteToRender.map((favorite) => {
          const photoFavorite = favorite && favorite.photo
          const idFavorite = favorite && favorite.id

          return (
            <div key={favorite && favorite.id}>
              <div className="rounded-lg">
                <div className="bg h-72 w-72 rounded-md">
                  <img
                    className=" h-72 w-72 rounded-tr-lg rounded-tl-lg shadow-lg"
                    src={photoFavorite}
                    alt="image publication"
                  />
                </div>
                <div className="flex flex-col items-center pb-10 bg rounded-br-lg rounded-bl-lg">
                  <h5 className="w-60 h-6 mb-1 mt-2 text-sm font-semibold text-team-blue tracking-wide text-center">
                    {favorite && favorite.description}
                  </h5>
                  <span className="mt-4 text-team-green dark:text-gray-400 font-thin">
                    {favorite && favorite.date}
                  </span>
                  <div className="mt-2 flex space-x-3">
                    <button
                      href="#"
                      onClick={() => {
                        setOpenModalImg(true)
                        setPhotoFavorite(photoFavorite)
                        getComments(idFavorite)
                        setIdFavoriteState(idFavorite)
                      }}
                      className="relative -bottom-4 inline-flex items-center rounded-lg bg-team-brown py-2 px-4 text-center text-sm font-medium text-bg hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Ver mas
                    </button>
                    <button
                      href="#"
                      onClick={() => handleDeleteFavorite(favorite.id)}
                      className="relative -bottom-4 inline-flex items-center rounded-lg bg-team-brown py-2 px-4 text-center text-sm font-medium text-bg hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      eliminar favorito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
