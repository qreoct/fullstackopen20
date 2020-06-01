import React from 'react'
import {
  Link
} from 'react-router-dom'
import '../styles/menu.css'

const Menu = ({user, logoutHandler}) => {

  return (
    <div className="nav-menu">
      <Link to="/" className="nav-elem">home</Link>
      <Link to="/users" className="nav-elem">users</Link>

      <div className="nav-user-elem"> 
      {user 
        ? 
          <div>
          <span> Currently logged in as {user} </span>
          <button onClick={logoutHandler}> logout </button>
          </div>
        : null
      }
      </div>
    </div>
  )
}

export default Menu