# Notes for part 5

## 5.8/5.9, like button and re-rendering.

Quite tricky to get the like button and rendering working properly. First off, it might seem to make sentence to directly call setBlog(blogs.map( //...) ), but that doesn't properly render for some reason.

Another approach which uses async to get back the changed object after PUT, then modifying the original blogs array works, but really slowly. I suspect this is because it needs to run .map() twice. It also causes a second issue:

The put object that's sent back from the backend only has a single key:value pair of user:"id"... but the original GET method that got all the blogs has a whole {user:"id", username:"username"} object inside of it. so this causes some code problems. does this mean its necessary to change the backend code to suit this?

As a result of this small issue, the delete button display doesn't work after doing a single upvote. The delete button only displays when logged in username == username of the one that made the blog post, but since username is not returned from the PUT request, the equality will always return false.
