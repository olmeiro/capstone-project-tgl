import React from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Tooltip } from 'flowbite-react'
import { PlusIcon } from '@heroicons/react/outline'

import { useHomeStore } from '../../../hooks/useHomeStore'

import userNotFound from '../../../../assets/userNotFound.jpg'
import photoDefault from '../../../../assets/photoDefault.png'

const SearchResults = () => {
  const { userSearch } = useSelector((state) => state.home)
  const { addFriendshipHook, setLastUserVisitedHook } = useHomeStore()

  const handleLastUserVisited = (userAlias, userId) => {
    setLastUserVisitedHook(userAlias, userId)
  }

  const handleAddFriend = (friendId) => {
    addFriendshipHook(friendId)
    Swal.fire('amistad agregada')
  }

  return (
    <div className="basis-1/4 px-4 flex justify-center h-[80vh]">
      <ul className="divide-y divide-gray-200 flex flex-col md:place-items-stretch">
        {userSearch && userSearch.length > 0
          ? (
              userSearch.map((user) => {
                return (
              <li className="py-4 flex justify-around" key={user.id}>
                <Link
                  to={`/profile/${user.alias}`}
                  onClick={() => handleLastUserVisited(user.alias, user.id)}
                >
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.photoProfile ? user.photoProfile : photoDefault}
                    alt="Image Not Found"
                  />
                </Link>
                <Link
                  to={`/profile/${user.alias}`}
                  onClick={() => handleLastUserVisited(user.alias, user.id)}
                >
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {user.alias}
                    </p>
                    <p className="text-sm text-gray-500 inline-block">
                      {user.email}
                    </p>
                  </div>
                </Link>
                <div className="w-8">
                  <Tooltip content="Agregar amistad" arrow={false}>
                    <button onClick={() => handleAddFriend(user.id)}>
                      <PlusIcon
                        className="h-6 w-6 mb-3 relative top-1  rounded-full text-white bg-team-dark"
                        aria-hidden="true"
                      />
                    </button>
                  </Tooltip>
                </div>
              </li>
                )
              })
            )
          : (
          <img className="w-[750px] " src={userNotFound} />
            )}
      </ul>
    </div>
  )
}

export default SearchResults
