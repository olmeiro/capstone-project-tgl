import React from 'react'
import { Tooltip } from 'flowbite-react'
import { PlusIcon } from '@heroicons/react/outline'

const people = [
  {
    name: 'Calvin Hawkins',
    email: 'calvin.hawkins@example.com',
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Kristen Ramos',
    email: 'kristen.ramos@example.com',
    image:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Ted Fox',
    email: 'ted.fox@example.com',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
]

export const SidebarLeft = () => {
  return (
    <div className='basis-1/4 px-4'>
      <ul className="divide-y divide-gray-200 flex flex-col md:place-items-stretch">
      {people.map((person) => (
        <li key={person.email} className="py-4 flex justify-around">
          <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{person.name}</p>
            <p className="text-sm text-gray-500 inline-block">{person.email}</p>
          </div>
          <div className='w-8'>
            <Tooltip content="Agregar amistad" arrow={false}>
              <PlusIcon
                className="h-6 w-6 mb-3 relative top-1  rounded-full text-white bg-team-dark"
                aria-hidden="true"
              />
            </Tooltip>
          </div>
        </li>
      ))}
    </ul>
    </div>
  )
}
