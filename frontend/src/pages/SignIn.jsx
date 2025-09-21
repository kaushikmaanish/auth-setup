import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signin } from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'

export default function SignIn(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = async (e) =>{
    e.preventDefault()
    try{
      await dispatch(signin({ username, password })).unwrap()
      navigate('/chat')
    }catch(err){
      alert('Login failed: ' + (err.message || err))
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={submit}>
        <h2>Sign In</h2>
        <label>Username</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  )
}
