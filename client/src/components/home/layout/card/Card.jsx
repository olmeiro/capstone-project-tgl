import React, { useEffect, useState } from 'react'
import CarDrawer from './CardDrawer'
import CardComments from './CardComments'
import HeaderCard from './HeaderCard'

export const Card = ({ photo, description, likes, date, postId, likeAPost, userId }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className='mb-3'>
      <HeaderCard setIsOpen={setIsOpen} userId={userId} photo={photo} description={description} likes={likes} date={date} likeAPost={likeAPost} postId={postId} />
      <CarDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <CardComments postId={postId} />
      </CarDrawer>
    </div>
  )
}
