const initialFilter = ''

export const filterAnec = (content) => {
	return {
		type: 'FILTER',
		data: { content }
	}
}

const filterReducer = (state = initialFilter, action) => {
	switch(action.type){
		case 'FILTER': {
			return action.data.content
		}
		default:
			return state
	}
}

export default filterReducer