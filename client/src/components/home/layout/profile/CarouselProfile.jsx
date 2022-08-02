import React from 'react'
import { Carousel } from 'flowbite-react'
import { useSelector } from 'react-redux'

export const CarouselProfile = () => {
  const { publications } = useSelector(state => state.profile)

  return (
    <>
      {
        publications.length === 0
          ? (
          <div className="bg-team-blue h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel slideInterval={5000}>
              <img
                src="../../../../assets/logo.png"
                alt="..."
              />
              <img
                src="/assets/carousel-2.svg"
                alt="..."
              />
              <img
                src="/assets/carousel-3.svg"
                alt="..."
              />
              <img
                src="/assets/carousel-4.svg"
                alt="..."
              />
              <img
                src="/assets/carousel-5.svg"
                alt="..."
              />
            </Carousel>
          </div>
            )
          : (
            <div className="bg-team-blue h-56 sm:h-64 xl:h-80 2xl:h-96">
              <Carousel slideInterval={5000}>
                {
                  publications.map(publication => (
                    <img
                    key={publication.idUser}
                  src={publication.photo}
                  alt="..."
                />
                  ))
                }
              </Carousel>
            </div>
            )
      }
    </>
  )
}
