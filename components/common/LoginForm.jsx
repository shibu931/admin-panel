'use client'
import React from 'react'
import { signIn } from "next-auth/react"
import { redirect } from 'next/navigation.js';

const LoginForm = () => {
    const [formData,setFormData] = React.useState({
        email: "",
        password: ""
    })
    const [error,setError] = React.useState(null)
    const [loading,setLoading] = React.useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        setError(null)
        const result = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false, 
        });
        if (!result?.error) {
            redirect("/");            
        } else {
            console.error("Authentication failed:", result.error);
            setError(result.error)
        }
        setLoading(false)
    }
    return (
        <div className='relative p-6 py-8 rounded-xl min-w-80 max-w-96 border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/20 backdrop-blur-3xl shadow-2xl shadow-black/50 overflow-hidden'>
            <div className='absolute inset-0 -z-10'>
                <div className='absolute h-32 w-32 -top-16 -left-16 bg-purple-500/20 rounded-full blur-xl'></div>
                <div className='absolute h-32 w-32 -bottom-16 -right-16 bg-cyan-500/20 rounded-full blur-xl'></div>
            </div>

            <h2 className='text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wide uppercase'>
                Admin Portal
            </h2>

            <div className='my-8 h-px bg-gradient-to-r from-gray-700/0 via-gray-500/50 to-gray-700/0'></div>

            <form className='space-y-6' onSubmit={(e)=>handleSubmit(e)}>
                <div className='group relative'>
                    <input
                        name='email'
                        type='email'
                        className='w-full pl-10 pr-4 py-3 bg-gray-800/40 border border-gray-700/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200'
                        placeholder='Email'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <svg className='w-5 h-5 absolute left-3 top-3.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                    </svg>
                </div>

                <div className='group relative'>
                    <input
                        name='password'
                        type='password'
                        className='w-full pl-10 pr-4 py-3 bg-gray-800/40 border border-gray-700/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200'
                        placeholder='Password'
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <svg className='w-5 h-5 absolute left-3 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                    </svg>
                </div>

                <button disabled={loading} className='w-full py-3 px-6 bg-gradient-to-r from-cyan-500/80 to-purple-500/80 text-gray-100 font-semibold rounded-lg hover:from-cyan-500 hover:to-purple-500 hover:scale-[1.02] transform transition-all duration-200 active:scale-95 shadow-lg hover:shadow-cyan-500/20 hover:cursor-pointer'>
                    {loading ? "Loading..." : "Login"}
                </button>
                <p className='text-center text-red-500'>{error && 'Incorrect Login Details'}</p>
            </form>

        </div>
    )
}

export default LoginForm