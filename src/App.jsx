import { useEffect, useState } from 'react'
import './index.css'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } 
      })
      .catch(()=>{
        dispatch(logout())
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    
      <div className='bg-gradient-to-b from-[#0F2854] to-[#143A6F] '>
        <Header/>
        <main >
          <Outlet/>
        </main>
        <Footer />
      </div>
   
  ) : null
}

export default App
