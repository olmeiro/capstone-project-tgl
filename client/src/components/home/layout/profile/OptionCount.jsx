import React, { useEffect, useState } from 'react'
import { Modal } from 'flowbite-react'

import { useProfileStore } from '../../../../hooks/useProfileStore'
import { useAuthStore } from '../../../../hooks'

export const OptionCount = () => {
  const [modalInactive, setModalInactive] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [idUser, setIdUser] = useState('')

  const { user } = useAuthStore()
  const { inactiveCount, deleteCount } = useProfileStore()

  const inactiveCountUser = () => {
    inactiveCount(idUser)
  }
  const deleteCountUser = (id) => {
    deleteCount(idUser)
  }

  useEffect(() => {
    setIdUser(user.id)
  }, [])

  return (
    <div>
      <>
        <Modal
          show={modalInactive}
          size="md"
          popup={true}
          onClose={() => setModalInactive(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Estas seguro de inactivar la cuenta?
              </h3>
              <button
                data-modal-toggle="popup-modal"
                onClick={inactiveCountUser}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Sí, inactivar
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancelar
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </>

      <>
        <Modal
          show={modalDelete}
          size="md"
          popup={true}
          onClose={() => setModalDelete(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Esta seguro de eliminar la cuenta?
              </h3>
              <button
                data-modal-toggle="popup-modal"
                onClick={deleteCountUser}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Sí, eliminar
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancelar
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </>

      <div className="w-full flex flex-row justify-center">
        <button
          className="h-10 w-28 text-white mr-2 bg-team-brown rounded-md hover:bg-team-blue"
          onClick={() => setModalInactive(true)}
        >
          Inactivar
        </button>
        <button
          className="h-10 w-28 text-white bg-pink-500 rounded-md hover:bg-team-blue"
          onClick={() => setModalDelete(true)}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
