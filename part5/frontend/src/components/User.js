import React, { useState } from 'react'

const User = (props) => {

  const username = props.user?props.user.username:'null'
  const id= props.user?props.user.id:'null'

  const [showId, setId]=useState(0)

  const handleId = () => {
    setId(!showId)
  }

  return(
  <>
  <span onClick={handleId}> user: {username} </span>
  {showId? <p><em> id: {id} </em></p>: <></>}
  </>
  )
}

export default User
