import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'flowbite-react'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { Modal } from 'flowbite-react'
import { useProfileStore } from '../../../../hooks/useProfileStore'
import { useAuthStore } from '../../../../hooks'
import { useParams } from 'react-router-dom'
import { useHomeStore } from '../../../../hooks/useHomeStore'
import photoDefault from '../../../../../assets/photoDefault.png'
import Swal from 'sweetalert2'

export const CardPublication = () => {
  const { user } = useAuthStore()

  const [loginUserId, setIdUser] = useState('')
  const { loadingPublicationUser, deletePostUser } = useProfileStore()

  const deletePhoto = async (postId, userId) => {
    await deletePostUser(postId, userId)
    checkInfoUserHook()
  }
  const { userAlias } = useParams()
  const { lastUserVisited, checkInfoUser, postsFromUserLoggedIn } = useSelector(state => state.home)

  const { checkInfoUserHook, keepLastUserVisitesOnRedux, checkCommentsHook, getCommentsByPost, deleteComment } = useHomeStore()
  const [publications, setPublications] = useState() // publicaciones del usuario logeado

  const [openModalImg, setOpenModalImg] = useState(false)
  const [photoFavorite, setPhotoFavorite] = useState();
  const [comments, setComments] = useState()
  const { checkComments } = useSelector(state => state.home)
  const [idFavoriteState, setIdFavoriteState] = useState()
 
  const userId = user.id

  const handleDeleteComment = (commentId) => {
    Swal.fire({
      title: '¿estas seguro de eliminar este comentario?',
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then(result => {
      if (result.isConfirmed) {
        deleteComment(commentId)
        checkCommentsHook()
        Swal.fire(
          'Eliminado!',
          'El comentario ha sido eliminado.',
          'success'
        )
      }
    })
  }


  const getComments = async (idFavorite) => {
    const getComments = await getCommentsByPost(idFavorite)
    setComments(getComments)
  }

  useEffect(() => {
    getComments(idFavoriteState)
  }, [checkComments])

  useEffect(() => {
    setIdUser(user.id)
    loadingPublicationUser(user.id)
    setPublications(postsFromUserLoggedIn)
    keepLastUserVisitesOnRedux()
  }, [loginUserId, postsFromUserLoggedIn, checkInfoUser])

  return (
    <div className='flex flex-wrap justify-center gap-6 m-1'>

      <Modal
        show={openModalImg}
        size="md"
        popup={true}
        onClose={() => setOpenModalImg(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="">
            <div>
              <img src={photoFavorite && photoFavorite} alt="" />
            </div>

            {
              comments && comments.length != 0
                ?
                <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {
                      comments && comments.map(comment => {
                        return (
                          <li className="py-3 sm:py-4" key={comment.id}>
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src={comment.user.photoProfile ? comment.user.photoProfile : photoDefault} alt="image not found" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                  {comment.user.alias}
                                </p>
                                <div className="font-normal text-gray-700 dark:text-gray-400">
                                  <div className="text-ellipsis">{comment.comment}</div>
                                  <p className="text-xs">{comment.date}</p>
                                </div>
                              </div>
                              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                {userId === comment.UserId
                                  ? <button onClick={() => handleDeleteComment(comment.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                  : null}
                              </div>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>

                :
                <div role="status" className="flex justify-center mt-5">
                  <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                </div>
            }
          </div>

        </Modal.Body>
      </Modal>

      {
        userAlias
          ? lastUserVisited && lastUserVisited.posts.length === 0
            ? <div> Este usuario no tiene publicaciones agregadas</div>
            : lastUserVisited && lastUserVisited.posts.map((post) => {
              
              let photoPost = post && post.photo
              let idFavorite = post && post.id

              return (
                <div key={post.id} className="rounded-lg">
                  <div className='bg h-72 w-72 rounded-md'>
                    <img
                      className="h-72 w-72 rounded-tr-lg rounded-tl-lg shadow-lg"
                      src={post.photo}
                      alt="image publication"
                    />
                  </div>
                  <div className='flex flex-col items-center pb-10 bg rounded-br-lg rounded-bl-lg'>
                    <h5 className="w-60 h-6 mb-1 mt-2 text-sm font-semibold text-team-blue tracking-wide text-center">
                      {post.description}
                    </h5>
                    <span className="mt-4 text-team-green dark:text-gray-400 font-thin">
                      {post.date}
                    </span>
                    <button
                      href="#"
                      onClick={() => {
                        setOpenModalImg(true)
                        setPhotoFavorite(photoPost)
                        getComments(idFavorite)
                        setIdFavoriteState(idFavorite)
                      }}
                      className="relative -bottom-4 inline-flex items-center rounded-lg bg-team-brown py-2 px-4 text-center text-sm font-medium text-bg hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Ver mas
                    </button>
                    {
                      user.id === post.UserId
                        ? <div className="mt-4 flex space-x-3 lg:mt-6">

                          <button
                            href="#"
                            onClick={() => deletePhoto(post.id, post.UserId)}
                            className="relative -bottom-4 inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Eliminar foto
                          </button>
                        </div>
                        : null
                    }
                  </div>
                </div>
              )
            })
          : publications && publications.length === 0
            ? <div className='flex flex-col justify-center items-center'>
              <AiOutlineArrowUp />
              <h3
                className='text-xl text-team-blue font-bold'
              >Agrega una publicación</h3>
            </div>
            : publications && publications.map((publication) => {

              let photoPublication = publication && publication.photo
              let idFavorite = publication && publication.id

              return (
                <div key={publication.id} className='rounded-lg'>
                  <div className='bg h-72 w-72 rounded-md'>
                    <img
                      className=" h-72 w-72 rounded-tr-lg rounded-tl-lg shadow-lg"
                      src={publication.photo}
                      alt="image publication"
                    />
                  </div>
                  <div className="flex flex-col items-center pb-10 bg rounded-br-lg rounded-bl-lg">
                    <h5 className="w-60 h-6 mb-1 mt-2 text-sm font-semibold text-team-blue tracking-wide text-center">
                      {publication.description}
                    </h5>
                    <span className="mt-4 text-team-green dark:text-gray-400 font-thin">
                      {publication.date}
                    </span>
                    <div className="mt-2 flex space-x-3">
                      <button
                        href="#"
                        onClick={() => {
                          setOpenModalImg(true)
                          setPhotoFavorite(photoPublication)
                          getComments(idFavorite)
                          setIdFavoriteState(idFavorite)
                        }}
                        className="relative -bottom-4 inline-flex items-center rounded-lg bg-team-brown py-2 px-4 text-center text-sm font-medium text-bg hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Ver mas
                      </button>
                      <button
                        href="#"
                        onClick={() => deletePhoto(publication.id, publication.UserId)}
                        className="relative -bottom-4 inline-flex items-center rounded-lg bg-team-brown py-2 px-4 text-center text-sm font-medium text-bg hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Eliminar foto
                      </button>
                    </div>
                  </div>
                </div>
              )
            })

      }

    </div>
  )
}
