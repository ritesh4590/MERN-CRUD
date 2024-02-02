import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import AddUser from './pages/AddUser'
import UpdateUser from './pages/UpdateUser'
import UserCard from './pages/userCard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<AddUser />} />
        <Route path='/user/:id' element={<UserCard />} />
        <Route path='/update/:id' element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
