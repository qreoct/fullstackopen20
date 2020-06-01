import accountService from '../services/accounts.js'

export const initAccounts = () => {
  return async dispatch => {
    const accs = await accountService.getAll()
    dispatch({
      type:'INIT_ACCOUNTS',
      data: accs
    })
  }
}

const accountReducer = (state = [], action) => {
	switch(action.type){
		case 'INIT_ACCOUNTS': {
			return action.data
		}
		default:
			return state
	}
}

export default accountReducer