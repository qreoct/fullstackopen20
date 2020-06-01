import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import loginReducer from './reducers/loginReducer'
import notifReducer from './reducers/notifReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import accountReducer from './reducers/accountReducer'

const reducer = combineReducers({
	login: loginReducer,
	notif: notifReducer,
	user: userReducer,
	blog: blogReducer,
	accounts: accountReducer,
})

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

export default store