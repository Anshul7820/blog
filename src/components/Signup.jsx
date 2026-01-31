import React from 'react'
import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            //1. Create account
            await authService.createAccount({
                email: data.email,
                password: data.password,
                name: data.name,
            })

            //2. Login 
            await authService.login({
                email: data.email,
                password: data.password,
            })

            //3. Now safely get user
            const userData = await authService.getCurrentUser()
            if (userData) {
                dispatch(login({ userData }))
                navigate("/")
            }
        } catch (error) {
            setError(error.message || "Signup failed")
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg  rounded-xl p-10  bg-gradient-to-br from-[#0B1F3D] to-[#0F2854] shadow-2xl border border-white/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-extrabold text-white'>
                    Sign up to create account
                </h2>
                <p className='mt-2 text-center text-sm text-white/60'>
                    Already have an account?&nbsp;
                    <Link
                        to='/login'
                        className='font-semibold text-blue-400 hover:text-blue-300 transition'
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-700 mt-8 text-center'>{error}</p>}

                <form
                    onSubmit={handleSubmit(create)}>
                    <div className='space-y-6'>
                        <Input
                            label="Full Name:"
                            placeholder="Enter your full name..."
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email:"
                            placeholder="Enter your email..."
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password..."
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 text-lg font-semibold">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
