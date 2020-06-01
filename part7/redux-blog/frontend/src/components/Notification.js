import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/notif.css'

const Notification = () => {
  let notifType = 'notification'
  const notification = useSelector(({notif}) => {
    if (notif[1] === 'Standard') { notifType = 'notification' }
    else if (notif[1] === 'Error') { notifType = 'notification_err' }
    else if (notif[1] === 'Success') { notifType = 'notification_success' }
    else { notifType = 'notification-hidden' }
    return notif[0]
  })

  return (
    <div className={notifType}>
      <span className={notifType === 'notification-hidden'? '' : 'notif_content'}>
        {notification}
      </span>
    </div>
  )
}

export default Notification