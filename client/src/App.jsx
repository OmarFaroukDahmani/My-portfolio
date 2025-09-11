import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Signin from './pages/Signin'
import Projectedit from './pages/Projectedit'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/admin/edit/:id' element={<Projectedit/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
