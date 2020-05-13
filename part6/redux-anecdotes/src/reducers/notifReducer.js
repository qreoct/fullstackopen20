const initialNotif = [
	'Add a new anecdote to start...!'
]

const initialState = initialNotif

export const showNotif = (content) => {
	return {
		type: 'SHOW_NOTIF',
		data: { content }
	}
}

export const hideNotif = () => {
	return {
		type: 'HIDE_NOTIF'
	}
}

let currtimeout = 'init'

const timeout = (ms) => {
	return new Promise((resolve) => {
		let timeout = setTimeout(resolve, ms)
		if (currtimeout === 'init') { 
			console.log('init timeout')
			currtimeout = timeout 
		}
		else if (currtimeout !== timeout) {
			console.log('old timeout cancelled')
			clearTimeout(currtimeout)
			currtimeout = timeout
		}
	})
}

export const newNotif = (content, length) => {
	return async dispatch => {
		dispatch(showNotif(content))
		await timeout(length*1000)
		dispatch(hideNotif())
	}
}

const notifReducer = (state = initialState, action) => {
	switch(action.type){
		case 'SHOW_NOTIF': {
			const content = action.data.content
			return content
		}
		case 'HIDE_NOTIF': {
			return ''
		}
		default:
			return state
	}
}

export default notifReducer