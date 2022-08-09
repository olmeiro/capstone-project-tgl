import React from 'react'
import { AppRouter } from './routes/AppRouter'
import { HashRouter } from 'react-router-dom'

export default function App () {
  return (
     <HashRouter>
       <AppRouter />
     </HashRouter>
  )
}
