import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Tooltip } from 'flowbite-react'

import { useAuthStore } from '../../../hooks'
import { useHomeStore } from '../../../hooks/useHomeStore'
import imagePath from '../../../../assets/logo_Team_International.png'
import { Link } from 'react-router-dom'

const userMock = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}
const navigation = [
  { name: 'Team', href: '/', current: false },
  { name: 'Perfil', href: '/profile', current: false },
  { name: 'Amigos', href: '/friends', current: false },
  { name: 'Favoritos', href: '/favorites', current: false },
  { name: 'Mensajes', href: '/messenger', current: false }
]
const userNavigation = [
  { name: 'Salir', href: '#' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function NavBar() {
  const { startLogout } = useAuthStore()
  const [search, setSearch] = useState('')

  const { searchUserByAlias, checkEmptySearchBarHook } = useHomeStore()
  const { pathReference } = useSelector((state) => state.home)
  const { alias, photoProfile, email } = useSelector((state) => state.profile)

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const handleClearSearchBar = () => {
    setSearch('')
  }
  useEffect(() => {
    (async () => {
      await searchUserByAlias(search)
      checkEmptySearchBarHook()
    })()
  }, [search])

  return (
    <>
      <Disclosure as="nav" className="bg-team-dark">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-24">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 sm:w-[2.4rem] md:w-24 rounded-none bg-team-dark"
                      src={imagePath}
                      alt="Workflow"
                    />
                  </div>

                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => {
                        return (
                          pathReference == item.href
                            ? <Link
                              to={item.href}
                              key={item.name}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-team-brown hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                            : <Link
                              to={item.href}
                              key={item.name}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-team-green hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* search bar */}
                {pathReference === '/'
                  ? (
                  <div>
                    <div className="p-3">
                      <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <input
                          value={search}
                          onChange={(e) => handleSearch(e)}
                          type="text"
                          id="input-group-search"
                          className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-14"
                          placeholder="Buscar usuario"
                        />
                        <div className="flex absolute inset-y-0 right-0 items-center pl-3">
                          <button onClick={() => handleClearSearchBar()}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                    )
                  : null}

                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Tooltip
                      content={email}
                    >
                      <div
                        className="flex bg-gray-800 p-1 rounded-full text-team-green hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <p className="ml-3">Bienvenido {alias}</p>
                        <UserIcon
                          className="h-6 w-6 ml-1 mr-3 rounded-md"
                          aria-hidden="true"
                        />
                      </div>
                    </Tooltip>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              photoProfile !== ''
                                ? photoProfile
                                : userMock.imageUrl
                            }
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                  onClick={startLogout}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open
                      ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      )
                      : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        photoProfile !== '' ? photoProfile : userMock.imageUrl
                      }
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {userMock.user}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {email !== '' ? email : userMock.email}
                    </div>
                  </div>
                  <Tooltip
                    content={email}
                  >
                    <div
                      className="flex bg-gray-800 p-1 rounded-full text-team-green hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white sm:invisible"
                    >
                      <span className="sr-only">View notifications</span>
                      <p>Bienvenido {alias}</p>
                      <UserIcon className="h-6 w-6  rounded-md" aria-hidden="true" />
                    </div>
                  </Tooltip>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      onClick={startLogout}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
