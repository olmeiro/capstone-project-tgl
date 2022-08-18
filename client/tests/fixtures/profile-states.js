
export const initialState = {
  id: '',
  alias: '',
  name: '',
  bio: '',
  status: true,
  email: '',
  phone: '',
  password: '',
  photoProfile: '',
  photoCover: '',
  friends: [],
  photos: [],
  favorites: [],
  publications: [],
  changing: false
}

export const loadDataProfile = {
  id: 1,
  alias: 'jonh',
  name: 'john doe',
  bio: '',
  status: true,
  email: 'john@gmail.com',
  phone: '0123456789',
  password: '',
  photoProfile: '',
  photoCover: '',
  friends: [],
  photos: [],
  favorites: [],
  publications: [],
  changing: false
}

export const sendPublication = {
  loginUserId: 1,
  comment: 'the best photo',
  image: 'image',
  id: 1
}

export const changeData = {
  alias: 'Doe',
  name: 'John Doe Smith',
  bio: 'this is my best profile',
  email: 'doe@gmail.com',
  phone: 3333213652
}
