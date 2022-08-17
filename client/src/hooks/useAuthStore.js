import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { socialApi } from '../api'
import { clearErrorMessage, onChecking, onLogin, onLogout, onLoadDataProfile } from '../store'

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const startLogin = async ({ alias, password }) => {
    dispatch(onChecking())
    try {
      const { data } = await socialApi.post('/user/login', { alias, password })
      localStorage.setItem('token', data.body.token)

      const id = data.body.user.id
      const aliasUser = data.body.user.alias
      const name = data.body.user.name
      const bio = data.body.user.bio
      const email = data.body.user.email
      const phone = data.body.user.phone
      const photoProfile = data.body.user.photoProfile
      const favorites = data.body.user.favorites
      const friends = data.body.user.friends

      dispatch(onLoadDataProfile({ id, aliasUser, name, bio, email, phone, photoProfile, favorites, friends }))
      dispatch(onLogin({ id: data.body.user.id, alias: data.body.user.alias, name: data.body.user.name, photoProfile: data.body.user.photoProfile, friends: data.body.user.friends }))
    } catch (error) {
      dispatch(onLogout(error.response.data?.message || ''))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const startRegister = async ({ alias, name, email, phone, password }) => {
    dispatch(onChecking())
    try {
      const { data } = await socialApi.post('/user', { alias, name, email, phone, password })
      localStorage.setItem('token', data.body.token)
      dispatch(onLogin({ id: data.body.user.id, alias: data.body.user.alias, name: data.body.user.name }))
    } catch (error) {
      dispatch(onLogout(error.response.data?.message || ''))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const checkToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return dispatch(onLogout())
    }

    try {
      const { data } = await socialApi('/user/renew')
      localStorage.setItem('token', data.body.token)

      const dataUser = await socialApi.get(`/user/byid/${data.body.id}`)

      const id = dataUser.data.body.id
      const aliasUser = dataUser.data.body.alias
      const name = dataUser.data.body.name
      const bio = dataUser.data.body.bio
      const email = dataUser.data.body.email
      const phone = dataUser.data.body.phone
      const photoProfile = dataUser.data.body.photoProfile
      const favorites = dataUser.data.body.favorites
      const friends = dataUser.data.body.friends

      dispatch(onLoadDataProfile({ id, aliasUser, name, bio, email, phone, photoProfile, favorites, friends }))
      dispatch(onLogin({ id: data.body.id, alias: data.body.alias, name: data.body.name }))
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout())
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogout())
  }

  return {
    // properties
    errorMessage,
    status,
    user,
    // methods
    startLogin,
    startRegister,
    checkToken,
    startLogout
  }
}
