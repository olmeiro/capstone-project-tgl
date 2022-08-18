import React, { useState } from 'react'
import PropTypes from 'prop-types'

import CarDrawer from './CardDrawer'
import CardComments from './CardComments'
import HeaderCard from './HeaderCard'

export const Card = ({ photo, description, likes, date, postId, likeAPost, userId }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-3">
      <HeaderCard
        setIsOpen={setIsOpen}
        userId={userId}
        photo={photo}
        description={description}
        likes={likes}
        date={date}
        likeAPost={likeAPost}
        postId={postId}
      />
      <CarDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <CardComments postId={postId} />
      </CarDrawer>
    </div>
  )
}

Card.propTypes = {
  photo: PropTypes.string,
  description: PropTypes.string,
  likes: PropTypes.number,
  date: PropTypes.string,
  postId: PropTypes.number,
  likeAPost: PropTypes.func,
  userId: PropTypes.number
}
