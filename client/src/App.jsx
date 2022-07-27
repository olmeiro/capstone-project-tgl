import { AppRouter } from './routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'

export default function App () {
  return (
     <BrowserRouter>
       <AppRouter />
     </BrowserRouter>
  )
}
