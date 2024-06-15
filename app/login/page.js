"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

 const LoginPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [state,setState] = useState("SignIn")

  useEffect(() => {
    if(user.email.length>0 && user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])

  const onLogin = async () => {
    try {
      setLoading(true)

      const response = await axios.post("/api/users/login", user)
      setState(response.data.message)
      console.log("login success ", response.data)
      router.push("/profile")
      setLoading(false)
    }
    catch (err) {
      console.log("login failed")
      toast.error(err.message)
      setState(err.response.data.message)
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{loading ? "Processing...":state}</h1>
       

<input 
        className='p-1 text-black'
        id='emai'
        value={user.email}
        onChange={(e)=>setUser({...user,email:e.target.value})}
        placeholder='email'
        type='email'
        />

<input 
        className='p-1 text-black'
        id='password'
        value={user.password}
        onChange={(e)=>setUser({...user,password:e.target.value})}
        placeholder='password'
        type='password'
        />

        <button
          onClick={onLogin}
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        >
          {buttonDisabled?"no Login":"login"}
        </button>
        <Link href={"/signup"}>Visit signup page</Link>
    </div>
  )
}

export default LoginPage ;