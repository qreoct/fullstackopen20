import React from 'react';

import { useDispatch } from 'react-redux'
import { newLogin } from '../reducers/loginReducer'
import '../styles/login.css'

const Login = (props) => {
	const dispatch = useDispatch()

	const handleLogin = (e) => {
		e.preventDefault()
		const username = e.target.user.value
		const password = e.target.pass.value
		dispatch(newLogin({username,password}))
	}

	return(
	<div>
	<h2> Please log in to application </h2>
	<form onSubmit={handleLogin}>
		<span className="u-label"> Username: </span> <br />
		<input id="user" type="text" name="user" className="u"/> <br />
		<span className="p-label"> Password: </span> <br />
		<input id="pw" type="password" name="pass" className="p"/>  <br />
		<button className="button4" id="login-btn"> Login </button>
	</form>
	</div>
)}

export default Login