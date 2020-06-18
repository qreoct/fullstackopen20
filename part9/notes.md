# every

learned about the Array.every() function in js, which goes through every element in the array with a criteria and returns a single true/false!

# didn't do 9.6

it's about linting

# separating business logic and routing

The viewpoint of this author says that it's common practice to separate the business logic (services) from the routing components itself. So you'd set up two directories, src/services and src/routes.

Routes should purely be for routing purposes, for example when the user requests /api/posts, you should only serve the posts to the user. Additional things like filtering which posts should be seen is considered under business logic, and that should be taken care of with a Service in src/services.

Ideally, routes should call a function in the Service to get a result, and then give that result as a response to the user.
