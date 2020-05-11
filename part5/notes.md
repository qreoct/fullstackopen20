# Notes for part 5

## 5.8/5.9, like button and re-rendering.

Concept: I need the number of likes to go up when like button is pressed, and the blog posts should also sort according to number of likes.

Quite tricky to get the like button and rendering working properly. First off, it might seem to make sense to directly call setBlog(blogs.map( //...) ) every time like button is clicked, but that doesn't properly render for some reason.

Another approach which uses async to get back the changed object after PUT, then modifying the original blogs array works, but really slowly. I suspect this is because it needs to run .map() twice. It also causes a second issue:

The put object that's sent back from the backend only has a single key:value pair of user:"id"... but the original GET method that got all the blogs has a whole {user:"id", username:"username"} object inside of it. so this causes some code problems. does this mean its necessary to change the backend code to suit this?

As a result of this small issue, the delete button display doesn't work after doing a single upvote. The delete button only displays when logged in username == username of the one that made the blog post, but since username is not returned from the PUT request, the equality will always return false.

UPDATE: so by changing the backend for PUT requests to also .populate() the 'user' field with username, everything works fine.


## 5.13 Tests

My code in Blog.js has a portion which only renders a delete button when the logged in user is the same as the user that submitted that post. It uses window.localStorage.getItem to determine the current logged in user. However, when running tests, it's not able to access window.localStorage since it's not run in the browser. It tries to access loggedIn.username when loggedIn is undefined in the first place. This causes the render to fail.

UPDATE: short-circuited the logic such that if loggedIn is undefined, immediately return false and stop it from getting loggedIn.username

## Part 5 Test Coverage

Not really possible to get full 100% test coverage so far with frontend only. Certain things like testing for user posts and user id's not possible since we also need authentication with the backend. For example, cannot test for the functionality that clicking on the users username will cause it to expand to show id.

## Cypress

Honestly using Cypress was really fun! Watching the tests zoom by on the front end was quite exciting and nice to see everything work. Kinda better than simply running the frontend tests lol.
