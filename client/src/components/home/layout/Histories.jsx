import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useHomeStore } from '../../../hooks/useHomeStore'
import { Card } from './card/Card'

export const Histories = () => {
  const { getPostsToHomeHook, likeAPost, getInfoFromTheUserLoggedIn, getFavoritesHook } = useHomeStore()
  const { posts } = useSelector((state) => state.home)

  useEffect(() => {
    getPostsToHomeHook()
    getInfoFromTheUserLoggedIn()
    getFavoritesHook()
  }, [])

  return (
    <div className="flex flex-col basis-1 md:basis-1/3 scroll-smooth">
      {posts.length === 0
        ? null
        : posts.map((post) => {
          const date = new Date(post.date)
          const options = {
            timeStyle: 'short',
            dateStyle: 'full'
          }
          const colFormatter = Intl.DateTimeFormat('es-CO', options).format(
            date
          )
          return (
              <Card
                userId={post.UserId}
                postId={post.id}
                likeAPost={likeAPost}
                photo={post.photo}
                description={post.description}
                likes={post.likes}
                date={colFormatter}
                key={post.id}
              />
          )
        })}
    </div>
  )
}
