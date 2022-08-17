import { profileSlice, onLoadDataProfile, onSendPublication, onChangeDataProfile } from '../../../src/store/profile/profileSlice'
import { initialState, loadDataProfile, sendPublication, changeData } from '../../fixtures/profile-states'

describe('test profileSlice', () => {
  test('should return default state', () => {
    expect(profileSlice.getInitialState()).toEqual(initialState)
  })

  test('should load data profile', () => {
    const state = profileSlice.reducer(initialState, onLoadDataProfile(loadDataProfile))

    expect(state).toEqual({
      id: '',
      alias: undefined,
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
    })
  })

  test('should send publication', () => {
    const state = profileSlice.reducer(initialState, onSendPublication(sendPublication))

    expect(state.publications).toEqual([{
      id: 1,
      comment: 'the best photo',
      image: 'image',
      loginUserId: 1
    }])
  })

  test('should change data bio profile', () => {
    const state = profileSlice.reducer(loadDataProfile, onChangeDataProfile(changeData))
    // console.log(state)

    expect(state).toEqual({
      id: 1,
      alias: 'Doe',
      name: 'John Doe Smith',
      bio: 'this is my best profile',
      status: true,
      email: 'doe@gmail.com',
      phone: 3333213652,
      password: undefined,
      photoProfile: '',
      photoCover: '',
      friends: [],
      photos: [],
      favorites: [],
      publications: [],
      changing: false
    })
  })
})
