import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'flowbite-react'
import { AiOutlineArrowUp } from 'react-icons/ai'

import { useProfileStore } from '../../../../hooks/useProfileStore'
import { useAuthStore } from '../../../../hooks'

export const CardPublication = () => {
  const { user } = useAuthStore()
  const { publications } = useSelector((state) => state.profile)

  const [loginUserId, setIdUser] = useState('')
  const { loadingPublicationUser, deletePostUser } = useProfileStore()

  const deletePhoto = (postId, userId) => {
    deletePostUser(postId, userId)
  }

  useEffect(() => {
    setIdUser(user.id)
    loadingPublicationUser(user.id)
  }, [loginUserId])

  return (
    <div className='flex flex-wrap justify-center gap-6'>
        {publications.length === 0
          ? <div className='flex flex-col justify-center items-center'>
            <AiOutlineArrowUp />
              <h3
                className='text-xl text-team-blue font-bold'
              >Agrega una publicación</h3>
            </div>
          : publications.map((publication) => {
            return (
                <Card key={publication.id} >
                  <div className="flex flex-col items-center pb-10 w-72 sm:w-64 shadow-md">
                    <img
                      className="mb-3 h-24 w-24  shadow-lg rounded-md"
                      src={publication.photo}
                      alt="Bonnie image"
                    />
                    <h5 className="mb-1  text-lg font-medium text-gray-900 dark:text-white ">
                      {publication.description}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {publication.date}
                    </span>
                    <div className="mt-4 flex space-x-3 lg:mt-6">
                      <button
                        href="#"
                        onClick={() => deletePhoto(publication.id, publication.UserId)}
                        className="relative -bottom-4 inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Eliminar foto
                      </button>
                    </div>
                  </div>
                </Card>
            )
          })}
    </div>
  )
}
