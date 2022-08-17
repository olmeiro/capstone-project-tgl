import React, { useState, useEffect } from 'react'
import { Carousel } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const CarouselProfile = () => {
  const { lastUserVisited, postsFromUserLoggedIn } = useSelector((state) => state.home)
  const { userAlias } = useParams()
  const [publications, setPublications] = useState()

  useEffect(() => {
    setPublications(postsFromUserLoggedIn)
  }, [postsFromUserLoggedIn])

  return (
    <>
      {userAlias
        ? (
            lastUserVisited && lastUserVisited.posts.length === 0
              ? null
              : (
          <div className="bg-team-blue h-56 sm:h-64 xl:h-80 2xl:h-96">
            {!lastUserVisited
              ? null
              : (
              <Carousel slideInterval={5000}>
                {lastUserVisited &&
                  lastUserVisited.posts.map((post) => (
                    <img key={post.idUser} src={post.photo} alt="..." />
                  ))}
              </Carousel>
                )}
          </div>
                )
          )
        : publications && publications.length === 0
          ? (
        <div
          className="bg-team-blue h-56 sm:h-64 xl:h-80 2xl:h-96"
          key={publications.idUser}
        >
          <Carousel slideInterval={5000}>
            <img src="../../../../assets/logo.png" alt="photo carousel" />
            <img src="/assets/carousel-2.svg" alt="photo carousel" />
            <img src="/assets/carousel-3.svg" alt="photo carousel" />
            <img src="/assets/carousel-4.svg" alt="photo carousel" />
            <img src="/assets/carousel-5.svg" alt="photo carousel" />
          </Carousel>
        </div>
            )
          : (
        <div className="bg-team-blue h-56 sm:h-64 xl:h-80 2xl:h-96">
          {!publications
            ? null
            : (
            <Carousel slideInterval={5000}>
              {publications &&
                publications.map((publication) => (
                  <img key={publication.id} src={publication.photo} alt="..." />
                ))}
            </Carousel>
              )}
        </div>
            )}
    </>
  )
}
