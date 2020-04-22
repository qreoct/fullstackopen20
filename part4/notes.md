# Notes for part 4

## Supertest errors
  connect ECONNREFUSED 127.0.0.1:80

  is an error when you declare a wrong path. i.e. '/api/users' is correct, 'api/users' is wrong

## Exercise 4.24 problem

Problem: When running tests, somehow the Users being saved to the db did not have passwordHash attribute, but POST requests still worked.

Source of issue: in the test, the Users are initialized with 

	await User.deleteMany({})

	const userObjects = helper.initialUsers.map(u => new User(u))
	const promiseArrayU = userObjects.map(u => u.save())
	await Promise.all(promiseArrayU)

where each u is

	const initialUsers = [
	{
		username:'root',
		name:'superman',
		password:'superman'
	},
	{
		username:'sadfjkl',
		name:'bane',
		password:'hunter2'
	}
	]

inside testing, each user is simply created with u.save() (a Mongoose method) but the user schema does not have a password attribute, hence its not saved.

Inside our POST router for /api/users (user creation), what is done is that a passwordHash is derived from req.body.password and THEN a new User object is created that has a passwordHash attribute, THEN .save() is called. So this is why in POST requests, the proper passwordHash is created but not when users are simply .saved() as was during testing. 

To fix, create users inside the breforeEach() using a proper POST request instead. That way, you can also get a header (Authorization bearer token) which can be used in each of the unit tests. Note the scope of definition of the header.
