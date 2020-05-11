import React from 'react';

const Login = (props) => {

	const userHandler = props.userHandler
	const pwHandler = props.pwHandler
	const loginHandler = props.loginHandler

	return(
	<div>
	<h2> Please log in to application </h2>
	Username: <input id="user" type="text" onChange={userHandler}/> <br />
	Password: <input id="pw" type="password" onChange={pwHandler}/>  <br />
	<button id="login-btn" onClick={loginHandler}> Login </button>
	</div>
)}

export default Login