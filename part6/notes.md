# Using Redux

Redux is a way to segregate all the different State changes and handlers we had in pure React. By using a 'reducer', we can route all the different 'actions' (i.e. state changes) and respective functionality into its own component separate from React Components. We also have an overall store that manages the state change.

That way, we can be a bit more independent with the Components themselves when -- having to call State Change Handlers in the past -- now we can simply use dispatch() to call the action.

~

When writing the components in this new way, maintain the best practice of keeping individiual Components separate when they have separate functionality. You can call the dispatchers from WITHIN the Component (e.g. see the 'vote' function from AnecdoteList.js in redux-anecdotes. 

# Initial setup of a reducer

We always need an initial state for a reducer. Create an initialState const and initialize it. Then, make a function Reducer with arguments (state = initialState, action). This function should use a case-switch logical operator to perform actions based on the 'action' argument supplied. Otherwise, the default should be to return the state.

You can export default this Reducer function which is used by the combineReducer, so that all the Components can see it.

# 6.9 Why do we have to move the Redux-store to store.js?

How is the separation from index.js done? And what is the reason? Does that mean the lines of code that have to import reducers from various places and combine them should be all contained in store.js?

ANSWER: from 'Asynchronous actions and redux thunk', running redux middleware must be initialized along with initialization of the store, so we can separate store.js from index.js and have middleware/reducers all together in one place

# 6.11 A bit stuck at show/hide notif

Able to write the reducer for showing/changing notifications when necessary, but not too sure how to integrate the setTimeout (or other similar feature) to enable the display timeout

ANSWER: my code for setTimeout was the one that was wrong...
Correct code:

setTimeout(() => {
	dispatch(clearNotification())
}, 5000)

Incorrect:
setTimeout( dispatch(clearNotification()), 5000 )


# Refresher on local server/db with json-server

npm install json-server and axios

make a db.json file, run the server

create a service that handles all the getting and writing to the db

access it using useEffect() (remember to import { useEffect } from 'react')

