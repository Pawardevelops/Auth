"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const SignupPage = () => {
  const router = useRouter()

  // State to manage form inputs
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })

  // State to manage button disabled status
  const [buttonDisabled, setButtonDisabled] = useState(true)
  // State to manage loading status
  const [loading, setLoading] = useState(false)
  // State to manage error messages
  const [error, setError] = useState("")

  // Effect to enable/disable the signup button based on form validation
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  // Function to handle sign-up logic
  const onSignUp = async () => {
    try {
      setLoading(true) // Start loading
      setError("") // Reset error

      const response = await axios.post("/api/users/signup", user)

      console.log("signup success ", response.data)
      toast.success("Signup successful!")
      router.push("/login") // Redirect to login page
    } catch (err) {
      console.log("signup failed", err)
      const errorMessage = err.response?.data?.error || "Signup failed";
      setError(errorMessage); // Set error message
      toast.error(errorMessage); // Show error toast
    } finally {
      setLoading(false) // Stop loading
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing..." : "Sign Up"}</h1>

      <input
        className='p-1 text-black'
        id='username'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='Username'
        type='text'
      />

      <input
        className='p-1 text-black'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='Email'
        type='email'
      />

      <input
        className='p-1 text-black'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='Password'
        type='password'
      />

      {error && <p className='text-red-500'>{error}</p>} {/* Display error message */}

      <button
        onClick={onSignUp}
        className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none ${buttonDisabled ? 'cursor-not-allowed' : 'focus:border-gray-600'}`}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>

      <Link href={"/login"}>Visit Login Page</Link>
      <Link href={"/resetpassword"}>forgot password</Link>
    </div>
  )
}

export default SignupPage;
