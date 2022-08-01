import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { socialApi } from '../api'
import { onLoadDataProfile, onChangeDataProfile, onLoadCommentPhoto, inactivatingCount, deletingCount, onLoadFriendsUser, onLoadPhotosUser } from '../store'

export const useProfileStore = () => {
  const { profileData } = useSelector(state => state.profile)
  const dispatch = useDispatch()

  const loadingDataProfile = async (id) => {
    const data = await socialApi.get('/user/byid', id)
    console.log('DATA-LOADINg-DATA', data)
    dispatch(onLoadDataProfile(data))
  }

  const loadingFriendsUser = () => {
    // get info api
    dispatch(onLoadFriendsUser()) // pasar info api
  }

  const loadingPhotoProfile = async (image, id) => {
    console.log("ID STORE", id)
    const formData = new FormData()
    formData.append('file', image)
    try {
      await socialApi.put('/user/profilephoto', formData)
      await loadingDataProfile(id)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }

  const loadingPhotosUser = () => {
    dispatch(onLoadPhotosUser())
  }

  const changeDataProfile = ({ alias, name, bio, email, phone, password }) => {
    // hacer post del coment con la api
    dispatch(onChangeDataProfile({ alias, name, bio, email, phone, password }))
  }

  const uploadCommentPhoto = (comment, id) => {
    console.log('commentHook', { comment, id })
    // hacer put comment en photo cover de user id
    dispatch(onLoadCommentPhoto(comment))
  }

  const deletePhotoUser = (id) => {
    console.log('delete photo user:', id)
    // hacer put photo user id
    // dispatch()
  }

  const inactiveCount = (id) => {
    // console.log('inactiveUser', id)
    // change data api user id borrado logico
    dispatch(inactivatingCount())
    // onLogout auth
  }

  const deleteCount = (id) => {
    // console.log('deleteUser', id)
    // change data api user id
    dispatch(deletingCount())
    // onLogout auth
  }

  return {
    // properties
    profileData,
    loadingFriendsUser,
    loadingPhotoProfile,
    loadingPhotosUser,
    // methods
    loadingDataProfile,
    changeDataProfile,
    uploadCommentPhoto,
    deletePhotoUser,
    inactiveCount,
    deleteCount
  }
}
