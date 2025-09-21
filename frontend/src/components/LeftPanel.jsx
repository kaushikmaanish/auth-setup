import React from 'react'

export default function LeftPanel(){
  const users = [
    { id: 1, name: 'General' },
    { id: 2, name: 'Support' },
    { id: 3, name: 'Random' }
  ]
  return (
    <div className="left-panel">
      <div className="brand">Chat App</div>
      <ul className="chat-list">
        {users.map(u=> <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  )
}
