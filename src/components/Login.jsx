import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState()

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center m-8'>
      <div className={`mx-auto w-full max-w-lg bg-gradient-to-br from-[#0B1F3D] to-[#0F2854] rounded-xl p-10 shadow-2xl border border-white/10`}>
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-center text-2xl font-extrabold  text-white'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm text-white/60'>
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className='font-semibold text-blue-400 hover:text-blue-300 transition'
          >
            Sign Up
          </Link>
        </p>
        {error && <p className='text-red-700 mt-8 text-center text-sm font-medium'>{error}</p>}
        <form
          onSubmit={handleSubmit(login)}
          className='mt-8'>
          <div className='space-y-6'>
            <Input
            className=" mt-2 px-4 py-3 rounded-lg bg-slate-100 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              label="Email:"
              placeholder="Enter your email..."
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                }
              })}
            />
            <Input
            className="mt-2 px-4 py-3 rounded-lg bg-slate-100 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              label="Password:"
              type="password"
              placeholder="Enter your password..."
              {
              ...register("password", {
                required: true
              })}
            />
            <Button
              type="submit"
              className="w-full  bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition active:scale-[0.98] text-lg"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
