import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'flowbite-react'
import { AiOutlineArrowUp } from 'react-icons/ai'

import { useProfileStore } from '../../../../hooks/useProfileStore'
import { useAuthStore } from '../../../../hooks'
import { useParams } from 'react-router-dom'
import { useHomeStore } from '../../../../hooks/useHomeStore'

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

  const { checkInfoUserHook, keepLastUserVisitesOnRedux } = useHomeStore()
  const [publications, setPublications] = useState() // publicaciones del usuario logeado

  useEffect(() => {
    setIdUser(user.id)
    loadingPublicationUser(user.id)
    setPublications(postsFromUserLoggedIn)
    keepLastUserVisitesOnRedux()
  }, [loginUserId, postsFromUserLoggedIn, checkInfoUser])

  return (
    <div className='flex flex-wrap justify-center gap-6 m-1'>
      {
        userAlias
          ? lastUserVisited && lastUserVisited.posts.length === 0
            ? <div> Este usuario no tiene publicaciones agregadas</div>
            : lastUserVisited && lastUserVisited.posts.map((post) => {
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
