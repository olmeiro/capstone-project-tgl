import React, { useEffect } from 'react'

import { useHomeStore } from '../../../hooks/useHomeStore'
import { Card } from './card/Card'
import { useSelector } from 'react-redux'

export const Histories = () => {
  const { getPostsToHomeHook, likeAPost, getInfoFromTheUserLoggedIn } = useHomeStore()
  const { posts } = useSelector(state => state.home)

  useEffect(() => {
    getPostsToHomeHook()
    getInfoFromTheUserLoggedIn()
  }, [])

  return (
    // <div className=" sm:flex-col basis-1 md:basis-1/3 scroll-smooth">
    <div className="flex flex-col-reverse basis-1 md:basis-1/3 scroll-smooth">
      {
        posts.length === 0
          ? null
          : posts.map(post => <Card userId={post.UserId} postId={post.id} likeAPost={likeAPost} photo={post.photo} description={post.description} likes={post.likes} date={post.date} key={post.id} />)
      }
    </div>
  )
}
