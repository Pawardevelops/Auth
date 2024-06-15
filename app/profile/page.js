"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
    const router = useRouter()
    const [data,setdata]=useState("nothing")

    useEffect(()=>{
        getUserDetails();
    },[])

    const getUserDetails = async()=>{
        try{
            const res = await axios.post("/api/users/me")
            setdata(res.data.data)
        console.log(res)
        }
        catch(err){
            toast.error(err.message)
        }
    }

    const logout = async()=>{
        try{
            await axios.post("/api/users/logout")
            toast.success("Logout success")
            router.push("/login")
        }
        catch(err){
            toast.error(err.message)
        }
    }
    return (
    <div
    className='flex flex-col items-center justify-center min-h-screen py-2'
    >
        <h1>Profile Page</h1>
        <h2>{data === "nothing" ? "nothing" :<Link href={"/profile/"+data._id}>{(<div>{<p>{data.username}</p>}{<p>{data.email}</p>}</div>)}</Link>}</h2>
    
        <hr/>
        <button
        onClick={logout}
        className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
            Logout
        </button>
    </div>
  )
}
