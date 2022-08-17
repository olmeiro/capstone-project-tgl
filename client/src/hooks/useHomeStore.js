import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { socialApi } from '../api'
import {
  chekChangeChat,
  setCurrentChat,
  checkFavorites,
  getFavorites,
  actionKeepLastUserVisitesOnRedux,
  getPostsToHome,
  getFriendsFromFriends,
  checkComments,
  getUserSearched,
  checkEmptySearchBar,
  setPathReference,
  setLastUserVisited,
  setInfoFromUserLoggedIn,
  setcheckInfoUser,
  setPostsFromUserLoggedIn
} from '../store'

export const useHomeStore = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const userId = user.id

  const entire = socialApi
    .get(`/user/byid/${userId}`)
    .then((response) => response.data.body)
  let friends = entire.then((user) => user.friends)

  const getPostsToHomeHook = async () => {
    friends = await friends
    let postsTotalFromFriends = friends.map(
      async (friendId) => await socialApi.get(`/posts/byuser/${friendId}`)
    )
    postsTotalFromFriends = Promise.all(postsTotalFromFriends)
    postsTotalFromFriends = await postsTotalFromFriends
    postsTotalFromFriends = postsTotalFromFriends
      .map((posts) => posts.data.body)
      .flat()
    dispatch(getPostsToHome(postsTotalFromFriends))
  }
  const getFriendsFromFriendsHook = async () => {
    const wholeUser = await socialApi.get(`/user/byid/${userId}`)
    const friendsId = wholeUser.data.body.friends
    let suggestion = friendsId.map(async (id) => {
      const response = await socialApi.get(`/user/byid/${id}`)
      const data = response.data
      const suggestion = data.body.friends
      return suggestion
    })
    suggestion = Promise.all(suggestion)
    suggestion = await suggestion
    suggestion = suggestion.flat()
    suggestion = suggestion.filter(
      (friendid, index) => suggestion.indexOf(friendid) === index
    )
    suggestion = suggestion.map(async (id) => {
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
    comments = comments.map(async (comment) => {
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
    if (aliasFromBody.trim() !== '') {
      const response = await socialApi.get('/user/all')
      const users = response.data.body
      foundUsers = users.filter((user) =>
        user.alias
          .toLowerCase()
          .includes(aliasFromBody && aliasFromBody.toLowerCase())
      )
    }
    dispatch(getUserSearched(foundUsers))
  }
  const checkEmptySearchBarHook = () => {
    dispatch(checkEmptySearchBar())
  }
  const sendPathHook = (pathReference) => {
    dispatch(setPathReference(pathReference))
  }
  const setLastUserVisitedHook = async (userAlias, userId) => {
    const responseUser = await socialApi.get(`user/byalias/${userAlias}`)
    const user = responseUser.data.body
    const responsePosts = await socialApi.get(`/posts/byuser/${userId}`)
    const posts = responsePosts.data.body
    user.posts = posts
    localStorage.setItem('lastUserVisited', JSON.stringify(user))
    const lastUserVisited = JSON.parse(localStorage.getItem('lastUserVisited'))
    dispatch(setLastUserVisited(lastUserVisited))
  }
  const keepLastUserVisitesOnRedux = async () => {
    const lastUserVisited = JSON.parse(localStorage.getItem('lastUserVisited'))
    dispatch(actionKeepLastUserVisitesOnRedux(lastUserVisited))
  }
  const getInfoFromTheUserLoggedIn = async () => {
    const user = await entire
    const responsePosts = await socialApi.get(`/posts/byuser/${userId}`)
    const posts = responsePosts.data.body
    const newUser = {
      ...user,
      posts
    }
    dispatch(setInfoFromUserLoggedIn(newUser))
  }
  const checkInfoUserHook = async () => {
    dispatch(setcheckInfoUser())
  }
  const getPostsFromUserLoggedIn = async () => {
    const responsePosts = await socialApi.get(`/posts/byuser/${userId}`)
    const posts = responsePosts.data.body
    dispatch(setPostsFromUserLoggedIn(posts))
  }
  const addToFavorites = async (postFavoriteId, userLogeadoId) => {
    await socialApi.post(
      `/favorites?postId=${postFavoriteId}&userId=${userLogeadoId}`
    )
  }
  const getFavoritesHook = async () => {
    const response = await socialApi.get(`/favorites/${userId}`)
    const favorites = response.data.body
    dispatch(getFavorites(favorites))
  }
  const deleteFavoriteHook = async (postId) => {
    await socialApi.delete(`/favorites?postId=${postId}&userId=${userId}`)
  }
  const checkFavoritesHook = async () => {
    dispatch(checkFavorites())
  }
  const setCurrentChatHook = (currentChat) => {
    dispatch(setCurrentChat(currentChat))
  }
  const chekChangeChatHook = () => {
    dispatch(chekChangeChat())
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
    sendPathHook,
    setLastUserVisitedHook,
    getInfoFromTheUserLoggedIn,
    checkInfoUserHook,
    getPostsFromUserLoggedIn,
    keepLastUserVisitesOnRedux,
    addToFavorites,
    getFavoritesHook,
    deleteFavoriteHook,
    checkFavoritesHook,
    setCurrentChatHook,
    chekChangeChatHook
  }
}
