import React from 'react'
import CarDrawer from './CardDrawer'
import CardComments from './CardComments'
import HeaderCard from './HeaderCard'

export const Card = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
   <>
     <HeaderCard setIsOpen={setIsOpen} />
       <CarDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
         <CardComments />
       </CarDrawer>
   </>
  )
}
