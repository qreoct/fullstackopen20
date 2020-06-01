import loginService from '../services/login'
import blogService from '../services/blogs'
import { newNotif } from './notifReducer.js'
import { setUser } from './userReducer.js'

export const newLogin = (cred) => {
	return async dispatch => {
		try {
			const newLog = await loginService.login(cred)
			dispatch(newNotif('Login success!', 'Success' , 2))
			dispatch(setUser(newLog))
			dispatch({
				type: 'NEW_LOGIN',
				data: newLog
			})
		    blogService.setToken(newLog.token)
		} catch {
			dispatch(newNotif('Login failed!', 'Error' , 2))
			dispatch({
				type: 'FAILED_LOGIN'
			})
		}
	}
}

const loginReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_LOGIN': {
    	return action.data
    }
    case 'FAILED_LOGIN': {
    	return ''
    }
    default:
    	return state
  }
}

export default loginReducer