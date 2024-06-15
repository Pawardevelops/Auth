"use client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function VerifyEmailPage(){
    const [token,setToken] = useState("")
    const [verified,setVerified] = useState(false)
    const [error,setError] = useState(false)
    const [state,setState] = useState("")

    useEffect(()=>{
        const userToken = window.location.search.split("=")[1]
        setToken(userToken || "")
    },[])

    useEffect(()=>{
        setError(false)

        //TODO : verify token properly
        if(token.length>0){
            verifyUserEmail();
        }
    },[token])
    const verifyUserEmail=async ()=>{
        try{
            const response = await axios.post("/api/users/verifyemail",{token})
            setVerified(true);
            setError(false)
            setState("Verified")

            console.log(response,"verify token response")
        }
        catch(err){
            setError(true)
            setState(err.response.data.message)
            console.log(err.response.data)
        }
    }
    return (
        <div 
        className="flex flex-col items-center justify-center min-h-screen py-2"
        >
            <h1 className="text-4xl">Verify Email</h1>
            <h2>{token? token : "no token"}</h2>
            {verified && (
                <div>
                    <h2>Verified</h2>
                    <Link href={"/login"}>Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2>{state}</h2>
                </div>
            )}
        </div>
    )
}