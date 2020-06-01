const initialNotif = [
	''
]

const initialState = initialNotif

export const showNotif = (content, style) => {
	return {
		type: 'SHOW_NOTIF',
		data: { content, style }
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
			currtimeout = timeout 
		}
		else if (currtimeout !== timeout) {
			clearTimeout(currtimeout)
			currtimeout = timeout
		}
	})
}

export const newNotif = (content, style, length) => {
	return async dispatch => {
		dispatch(showNotif(content, style))
		await timeout(length*1000)
		dispatch(hideNotif())
	}
}

const notifReducer = (state = initialState, action) => {
	switch(action.type){
		case 'SHOW_NOTIF': {
			const content = action.data.content
			const style = action.data.style
			return [content, style]
		}
		case 'HIDE_NOTIF': {
			return ''
		}
		default:
			return state
	}
}

export default notifReducer