import React, { useState } from 'react'

const BlogUserInfo = (props) => {

  const username = props.user?props.user.username:'null'
  const id= props.user?props.user.id:'null'

  const [showId, setId]=useState(0)

  const handleId = () => {
    setId(!showId)
  }

  return(
  <>
  <span onClick={handleId} className='username'> user: {username} </span>
  {showId? <p className='id'><em> id: {id} </em></p>: <></>}
  </>
  )
}

export default BlogUserInfo
