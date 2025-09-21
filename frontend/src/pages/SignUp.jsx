import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signup } from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'

export default function SignUp(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = async (e) =>{
    e.preventDefault()
    try{
      await dispatch(signup({ username, password })).unwrap()
      navigate('/chat')
    }catch(err){
      alert('Signup failed: ' + (err.message || err))
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={submit}>
        <h2>Sign Up</h2>
        <label>Username</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Create account</button>
        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
      </form>
    </div>
  )
}
