import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import { socialApi } from '../api'
import {
  onLoadDataProfile,
  onChangeDataProfile,
  onLoadCommentPhoto,
  inactivatingCount,
  deletingCount,
  onLoadFriendsUser,
  onLoadPublication,
  onSendPublication,
  onLoadPhotoProfile,
  onChanging
} from '../store'
import { useHomeStore } from './useHomeStore'

export const useProfileStore = () => {
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const { getPostsFromUserLoggedIn } = useHomeStore()
  const loadingDataProfile = async (id) => {
    try {
      const { data } = await socialApi.get(`/user/byid/${id}`)
      dispatch(onLoadDataProfile(data.body))
      Swal.fire({
        icon: 'success',
        title: 'Imagen cargada correctamente.'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo ha ido mal!'
      })
    }
  }

  const loadingFriendsUser = () => {
    // get info api
    dispatch(onLoadFriendsUser()) // pasar info api
  }

  const loadingPhotoProfile = async (image, idUser) => {
    const formData = new FormData()
    formData.append('file', image)
    try {
      await socialApi.put('/user/profilephoto', formData)
      let user = await socialApi.get(`/user/byid/${idUser}`)
      user = user.data.body
      dispatch(onLoadPhotoProfile(user.photoProfile))
      Swal.fire({
        icon: 'success',
        title: 'Fotos de perfil cargada correctamente.'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo ha ido mal!'
      })
    }
  }

  const sendPublicationUser = async (loginUserId, comment, image) => {
    const formData = new FormData()
    formData.append('loginUserId', loginUserId)
    formData.append('description', comment)
    formData.append('file', image)

    try {
      onLoadChanging()
      const { data } = await socialApi.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      getPostsFromUserLoggedIn()
      dispatch(onSendPublication(data.body))
      onLoadChanging()
      Swal.fire({
        icon: 'success',
        title: 'Fotos cargadas correctamente.'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo a ido mal cargando las imagenes!'
      })
    }
  }

  const loadingPublicationUser = async (id) => {
    try {
      const { data } = await socialApi.get('/posts/all', id)
      dispatch(onLoadPublication(data.body))
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo a ido mal cargando las publicaciones!'
      })
    }
  }

  const changeDataProfile = async ({
    idUser,
    alias,
    name,
    bio,
    email,
    phone
  }) => {
    try {
      await socialApi.put('/user/', { idUser, alias, name, bio, email, phone })
      dispatch(onChangeDataProfile({ alias, name, bio, email, phone }))
      Swal.fire({
        icon: 'success',
        title: 'Información actualizada correctamente.'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Información no actualizada correctamente.'
      })
    }
  }

  const uploadCommentPhoto = (comment, id) => {
    // TODO: hacer put comment en photo cover de user id
    dispatch(onLoadCommentPhoto(comment))
  }

  const deletePostUser = async (postId, userId) => {
    try {
      Swal.fire({
        title: 'Esta seguro de eliminar publicación?',
        text: 'No puedes revertir esta acción!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await socialApi.delete(`/posts/${postId}`)
            getPostsFromUserLoggedIn()
            loadingPublicationUser(userId)
            Swal.fire(
              'Borrado!',
              'La publicación ha sido eliminada.',
              'success'
            )
          } catch (error) {
            Swal.fire('No se pudo eliminar la publicación.')
          }
        }
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Información no actualizada correctamente.'
      })
    }
  }

  const inactiveCount = (id) => {
    // TODO: change data api user id borrado logico
    dispatch(inactivatingCount(id))
    // onLogout auth
  }

  const deleteCount = (id) => {
    // TODO: change data api user id
    dispatch(deletingCount(id))
  }

  const onLoadChanging = () => {
    dispatch(onChanging())
  }

  return {
    // properties
    profile,
    loadingFriendsUser,
    loadingPhotoProfile,
    sendPublicationUser,
    loadingPublicationUser,
    // methods
    onLoadChanging,
    loadingDataProfile,
    changeDataProfile,
    uploadCommentPhoto,
    deletePostUser,
    inactiveCount,
    deleteCount
  }
}
