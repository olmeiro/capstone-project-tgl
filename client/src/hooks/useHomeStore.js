import { useDispatch, useSelector } from 'react-redux'
import { socialApi } from '../api'
import { getPostsToHome, getFriendsFromFriends, checkComments, getUserSearched, checkEmptySearchBar, setPathReference, setLastUserVisited, getPostsOfLastUserVisited } from '../store'

export const useHomeStore = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const userId = user.id

  const entire = socialApi.get(`/user/byid/${userId}`).then(response => response.data.body)
  let friends = entire.then(user => user.friends)

  const getPostsToHomeHook = async () => {
    friends = await friends
    let postsTotalFromFriends = friends.map(async friendId => await socialApi.get(`/posts/byuser/${friendId}`))
    postsTotalFromFriends = Promise.all(postsTotalFromFriends)
    postsTotalFromFriends = await postsTotalFromFriends
    postsTotalFromFriends = postsTotalFromFriends.map(posts => posts.data.body).flat()
    dispatch(getPostsToHome(postsTotalFromFriends))
  }
  const getFriendsFromFriendsHook = async () => {
    const wholeUser = await socialApi.get(`/user/byid/${userId}`)
    const friendsId = wholeUser.data.body.friends
    let suggestion = friendsId.map(async id => {
      const response = await socialApi.get(`/user/byid/${id}`)
      const data = response.data
      const suggestion = data.body.friends
      return suggestion
    })
    suggestion = Promise.all(suggestion)
    suggestion = await suggestion
    suggestion = suggestion.flat()
    suggestion = suggestion.filter((friendid, index) => suggestion.indexOf(friendid) == index)
    suggestion = suggestion.map(async id => {
      const response = await socialApi.get(`/user/byid/${id}`)
      const data = response.data
      const suggestion = data.body
      return suggestion
    })
    suggestion = Promise.all(suggestion)
    suggestion = await suggestion
    dispatch(getFriendsFromFriends(suggestion))
  }
  const addFriendshipHook = async (friendId) => {
    await socialApi.post('/friends/', { userId, friendId })
  }
  const likeAPost = async (id) => {
    await socialApi.put('/posts/', { id, likes: 3 })
  }
  const makeAComment = async (postId, comment) => {
    await socialApi.post('/comments/', { comment, postId, userId })
  }
  const getCommentsByPost = async (postid) => {
    let comments = await socialApi.get(`/comments/bypost/${postid}`)
    comments = comments.data.body
    comments = comments.map(async comment => {
      const userId = comment.UserId
      let user = await socialApi.get(`/user/byid/${userId}`)
      user = user.data.body
      comment.user = user
      return comment
    })
    comments = await Promise.all(comments)
    return comments
  }
  const deleteComment = async (commentId) => {
    await socialApi.delete(`/comments/${commentId}`)
  }
  const checkCommentsHook = () => {
    dispatch(checkComments())
  }
  const searchUserByAlias = async (aliasFromBody) => {
    let foundUsers = null
    if (aliasFromBody.trim() != '') {
      const response = await socialApi.get('/user/all')
      const users = response.data.body
      foundUsers = users.filter(user => user.alias.toLowerCase().includes(aliasFromBody && aliasFromBody.toLowerCase()))
    }
    dispatch(getUserSearched(foundUsers))
  }
  const checkEmptySearchBarHook = () => {
    dispatch(checkEmptySearchBar())
  }
  const sendPathHook = (pathReference) => {
    dispatch(setPathReference(pathReference))
  }

  return {
    getPostsToHomeHook,
    getFriendsFromFriendsHook,
    addFriendshipHook,
    likeAPost,
    makeAComment,
    getCommentsByPost,
    deleteComment,
    checkCommentsHook,
    searchUserByAlias,
    checkEmptySearchBarHook,
    sendPathHook
  }
}
