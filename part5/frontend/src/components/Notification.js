import React from 'react'
import '../styles/notif.css'

const Notification = (props) => {
	const {message} = props

	if (message === null) {
		return null
	}
	else if(message.includes("ERROR")){
		return(
			<div className="notification_err">
				{message}
			</div>
		)
	}
	else{
		return(
			<div className="notification">
				{message}
			</div>
		)
	}
}

export default Notification