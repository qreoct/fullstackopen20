import React from 'react';

const Login = (props) => {

	const userHandler = props.userHandler
	const pwHandler = props.pwHandler
	const loginHandler = props.loginHandler

	return(
	<div>
	<h2> Please log in to application </h2>
	Username: <input type="text" onChange={userHandler}/> <br />
	Password: <input type="password" onChange={pwHandler}/>  <br />
	<button onClick={loginHandler}> Login </button>
	</div>
)}

export default Login