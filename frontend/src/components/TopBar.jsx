import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from '../features/notifications/notificationSlice'

export default function TopBar(){
  const credits = useSelector(s => s.credits.value)
  const dispatch = useDispatch()

  return (
    <div className="topbar">
      <div className="topbar-left">&nbsp;</div>
      <div className="topbar-right">
        <div className="credits">Credits: <strong>{credits}</strong></div>
        <button className="notif-btn" onClick={()=>dispatch(toggle())}>🔔</button>
      </div>
    </div>
  )
}
