export const setUser = (newLog) => {
    window.localStorage.clear()
    window.localStorage.setItem(
    	'loggedInBlogUser', JSON.stringify(newLog)
    )
	return {
		type: 'SET_USER',
		data: newLog
	}
}

const userReducer = (state = {}, action) => {
	switch(action.type){
		case 'SET_USER': {
			return action.data
		}
		default:
			return state
	}
}

export default userReducer