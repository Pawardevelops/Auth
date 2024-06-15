"use client"
import axios from 'axios'
import React, { useState } from 'react'

export default function page() {
    const [email,setEmail] = useState("")
    const [loading,setLoading] = useState(false)
    const [state,setState] = useState("")

    const resetPassword = async ()=>{
        try{
            setLoading(true)
            setState("Processing...")
            const res = await axios.post("/api/users/resetpassword",{email});
            console.log(res.data.message,"response")
            setState(res.data.message)
            setLoading(false)
        }
        catch(err){
            setLoading(false)
            setState("Something went Wrong")
            console.log(err.message)
        }
    }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <input
        className='p-1 text-black'
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        type='email'
      />

        {state}

      {
        <button
            onClick={resetPassword}
        >Reset password</button>
      }
    </div>
  )
}
