import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCredits } from '../features/credits/creditsSlice'
import TopBar from '../components/TopBar'
import LeftPanel from '../components/LeftPanel'
import NotificationPanel from '../components/NotificationPanel'
import { useNavigate } from 'react-router-dom'

export default function Chat(){
  const auth = useSelector(s=>s.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
    if(!auth.token) navigate('/signin')
    else {
      dispatch(fetchCredits())
    }
  }, [auth.token])

  return (
    <div className="app-shell">
      <TopBar />
      <NotificationPanel />
      <div className="main">
        <LeftPanel />
        <div className="chat-window">
          <div className="chat-header">General</div>
          <div className="messages">
            <div className="msg other">"Welcome to the web".</div>
          </div>
          <div className="composer">
            <input placeholder="Write a message..." />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}
