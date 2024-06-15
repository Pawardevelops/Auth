"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VerifyResetPassword() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setToken(window?.location.search.split("=")[1]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('/api/users/resetpassword/verify', {
        token,
        password
      });

      console.log(res,"res")
      if (res.data.success) {
        setSuccess(res.data.message);
      } else {

        setError(res.data.message)
        throw new Error(res.data.message || 'Something went wrong');
      }
    } catch (err) {
      console.log(err,"error")
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Password:
            <input
              className='text-black'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Confirm Password:
            <input
              className='text-black'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
