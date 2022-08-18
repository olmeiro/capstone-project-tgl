import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from 'flowbite-react'
import { PlusIcon } from '@heroicons/react/outline'
import Swal from 'sweetalert2'

import { useHomeStore } from '../../../hooks/useHomeStore'
import { useSelector } from 'react-redux'

import photoDefault from '../../../../assets/photoDefault.png'

export const SidebarLeft = () => {
  const { getFriendsFromFriendsHook, addFriendshipHook, setLastUserVisitedHook } = useHomeStore()
  let { suggestions } = useSelector((state) => state.home)
  suggestions = suggestions.slice(0, 10) // suggest 10 users only

  const handleAddFriend = (friendId) => {
    addFriendshipHook(friendId)
    Swal.fire('amistad agregada')
  }

  const handleLastUserVisited = (userAlias, userId) => {
    setLastUserVisitedHook(userAlias, userId)
  }

  useEffect(() => {
    getFriendsFromFriendsHook()
  }, [])

  return (
    <div className="basis-1/4 px-4">
      <ul className="divide-y divide-gray-200 flex flex-col md:place-items-stretch">
        {suggestions.map((user) => (
          <li key={user.id} className="py-4 flex justify-around">
            <Link
            className='basis-1/6'
              to={`/profile/${user.alias}`}
              onClick={() => handleLastUserVisited(user.alias, user.id)}
            >
              <img
                className="h-10 w-10 rounded-full"
                src={user.photoProfile ? user.photoProfile : photoDefault}
                alt="image friends suggestion"
              />
            </Link>
            <Link
              className='basis-4/6 mr-2'
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
            <div className="className='basis-1/6' flex items-center">
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
        ))}
      </ul>
    </div>
  )
}
