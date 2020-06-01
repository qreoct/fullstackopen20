# What is routing?

Routing is the conditional rendering of components **based on the url in the browser** 

It is used by placing components as children of the Router component.

import {
 BrowserRouter as Router,
 Switch, Route, Link
} from "react-router-dom"

const App = () => {
 return (
  <Router>
  	<Link to="/"> home </Link>
	<Link to="/notes"> notes </Link>
	<Link to="/users"> users </Link>
	
	<Switch>
		<Route path="/notes">
		  <Notes />
		</Route>
		<Route path="/users">
		  <Users />
		</Route>
		<Route path="/">
		  <Home />
		</Route>
	<Switch>
	<i> Static content </i>
  </Router>
 )
}

# 7.6 spread operators and fixing the error

On first glance, I'm not sure how to approach this. When we do 
	<input {...content} />
since content is an object, ALL of the attributes are passed into input including 'reset', which is a function and shouldn't be inside. So how can we not pass through the 'reset' prop?

Maybe we can use spread operators, so something like
	const {newContent, ...rest} = {...content, reset}
but that doesn't work????? uwu

# Refresher on Redux and Redux Thunk

Redux is a way to separate event handlers (now they're known as Action Creators, i think) in a way that components are cleaner and their event handlers are changed with function calls.

Redux uses things like useDispatch and useSelector:
useDispatch -> able to call (dispatch) functions within the Reducer files when needed
useSelector -> able to access the store which is like the main collection of all the states

To start a Redux project:

1. Make a store.js with createStore, combineReducers, redux thunk

Place all the reducers together, and then place that reducer in a store

export store from store.js

2. In index.js, import Provider with store that wraps the whole <App /> component.

3. Now within your <App />, you can create Components like before and pass props around. To acces the state, import { useSelector } and access state

to use the functions from the reducer, import { useDispatch } and the individual functions from the **reducer.js file. You can call those functions for example onClick = {() => dispatch (myFunc())}

4. Write your functions in the **reducer.js file, exporting by default the whole reducer itself and having each function name be a export const. Remember to define an initial state, as well as the case/switch criteria for actions!

# My steps for attempting 7.9

Basically refactoring the previous blogposts application, but use Redux for state management. I decided to go ahead and rebuild the entire front-end from scratch?? Why not, let's see.

So the first thing I did was refresh my memory on Redux, so I built a simple counter with buttons. Then I took the Notification Component as well as the reducer code from redux-anecdotes (part6), and it worked together (as expected!) 

Next thing, I started to bring in the log in component. So to do this we need to link the backend too, which luckily since we are doing fullstack we can just copy the backend folder from part5, and npm start to run that server in parallel with our React script. 

I implemented the blogService and loginService next. I copied over the old code, but looked for the portions where 'useState' was used and refactored it into Redux way of doing it. For example, to get all the blog posts on initial pageload, 

	1. on the main App.js, have a useEffect call initBlogs() from blogReducer
	2. initBlogs() is actually a function from blogReducer, and it will do all the important stuff like talking to the blogService and doing a getAll() to get all the blogs. then, it's able to set state from within the reducer.
	3. Once the state has been set, the App.js is able to communicate with the store and now get the full state of blogposts. It will then be rendered as per usual (blogs.map(b => {<Blog/>})) etc...

# A little bit more into useEffect

useEffect is used as a way to continuously run code (typically on every re-render). However, it can also be configured to do stuff such as run code on page load.

## Running code on page load:
	useEffect(() => {
		code u wanna run
		}, [])
The key part is the [] as a second argument to the useEffect. An empty array tells React that this effect should only be run once.

See [here](https://fullstackopen.com/en/part6/communicating_with_server_in_a_redux_application) for why you might sometimes see [dispatch] in the 2nd argument (ctrl+f '[dispatch]'). It sometimes throws a warning **"React Hook useEffect has a missing dependency: 'dispatch'. Either include it or remove the dependency array"**

# V important about reducers!!

Do always remember to check the initial state! Sometimes the initial empty state should be an empty object ({}), or array ([]), or simply an empty string/null value. This initial empty state might sometimes be part of a .map() function, which ONLY works on arrays!! 

Also, sometimes you might forget to import over the Reducer into the store.js file!! Otherwise the rest of the application won't be able to read the global status!
