import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNotifications } from '../features/notifications/notificationSlice'

export default function NotificationPanel(){
  const { open, items } = useSelector(s => s.notifications)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(open) dispatch(fetchNotifications())
  }, [open])

  if(!open) return null
  return (
    <div className="notif-panel">
      <h4>Notifications</h4>
      <ul>
        {items.length === 0 ? <li>No notifications</li> : items.map(n=> (
          <li key={n.id} className={n.seen ? 'seen' : 'new'}>
            <div className="msg">{n.message}</div>
            <div className="time">{new Date(n.created_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
