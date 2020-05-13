import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({notif}) => {
    return notif
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    maxWidth: '30%',
    backgroundColor: '#bbb',
    borderRadius: '5px',
    borderStyle: 'outset',
    color: 'white'
  }
  const hidden = {
    display: 'none'
  }
  return (
    <div style={notification === '' ? hidden : style}>
      {notification} 
    </div>
  )
}

export default Notification