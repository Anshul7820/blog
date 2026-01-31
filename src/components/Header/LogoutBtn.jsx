import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button 
        onClick={logoutHandler}
        className='w-full md:w-auto inline-block px-6 py-2 duration-200 hover:bg-blue-700 rounded-full border border-blue-500 text-white hover:text-white text-base font-medium'>
            Logout
        </button>
    )
}

export default LogoutBtn
