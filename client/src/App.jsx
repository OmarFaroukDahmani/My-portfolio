import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Project from './pages/Project'
import Signin from './pages/Signin'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='home' element={<Home/>} />
          <Route path='admin' element={<Admin/>} />
          <Route path='signin' element={<Signin/>} />
          <Route path='project' element={<Project/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
