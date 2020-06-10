# GraphQL

GraphQL is an alternative way of retrieving data from a server. It is an alternate to a REST API. Instead of having different routes for GET, SET, POST etc, everything in GraphQL can be done with query and mutations, with greater flexibility.

For instance, you can query allUsers but only choose to receive the data for 'username' and 'signUpDate'. You can nest queries and make many complex requests, which are harder to do with a REST API. 

The workings is quite similar, have a backend where the schema and queries are defined with GraphQL. Then the front-end (React in this case), can act as a client and call on these queries, receiving the results and displaying it in the application. For some reason, the author says there's no need to use Redux with GraphQL, but I'm not entirely sure why.

# IDs and mongo

When linking the backend to mongo (like in part 8.13), previously if we did everything entirely in GraphQL, we had to add our own "id" field to each object created. Since MongoDB handles this automatically for us (with the "\_id" field), we don't have to create this id field.

# Very nasty bug

I kept getting the error "cannot return null for non-nullable field Author.name", when trying to implement the schema where the 'author' field in Book should actually return an Author object.

The bug suddenly disappeared? I'm genuinely not sure what caused it, either. I was adding a resolver for the 'author' parameter when Book was called, so maybe it was from there. Seems like there's no need to explicitly tell graphQL that the author: field is an Object, perhaps within the MongoDB Schema of ObjectID it all gets resolved.

Anyway, after this "object within object" is established, REMEMBER to double check the front end! The gql query needs to be reformed, for example
	query {
		allBooks {
			title,
			author {
				name,
				born
			}
		}
	}

And when rendering the components, change from simply rendering {b.author} to {b.author.name}

# Find vs FindOne()

Another nasty source of bugs from Mongo. Running FindOne() will always return a single object, but calling Find returns it in an array ([])! So if you are only expecting one object, it's better to use findOne().

# Another headscratching bug with mutations and args

I have defined a new schema, both in MongoDB and in GraphQL. It's a User object that takes username and favoriteGenre.

However, when I write a mutation createUser(root, args), the args that I'm getting are perfectly correct (as seen from console.logs). When the code new User({username: args.username, favoriteGenre: args.favoriteGenre}) is called, somehow ONLY the username field is populated in this new User!!! Very strange and I can't get to the bottom of this yet.

UPDATE: I'm an idiot... I simply mispelled 'favorite' as 'favourite' in the models/user.js page.

# re-setting header files upon logging in and logging out

I don't think this was covered under the material, but from my own testing it seems that you can only ever log in once on this application. Subsequently, if you were to log out, the logout function would remove the authorization token and any log ins after that will simply not have an authorization token, meaning issues start to happen.

The main point where this issue occurs is the authLink setContext() bit... I'm not sure but could it be that this setContext is only run once?

Nope, seems like setContext is actually being called on every single request made to the server. But I believe it's some racecondition where we're trying to access token from localStorage when it's not even retrieved yet when running the login mutation.

ACTUALLY everything could probably be solved if you just refresh the page on logout........

# rendering and making things as states if you want them to render

Discovered an issue which makes sense if you realize what React is entirely about: the changing of states and rerendering only the recessary components whose states have changed.

I had an array called booksfiltered which contains all the filtered books after running some functions on a books array (books array had state). However, my component was constantly trying to render {booksfiltered.map(b => <p> b </p>)} which didn't seem to show anything.

Actually, since the initial render is done at the start of the page (where booksfiltered was initialized as an empty array), nothing was rendered! And even though booksfiltered changed throughout the code, because it wasn't assigned a STATE, React doesn't rerender. 

Changing booksfiltered to a stateful variable solved this issue.

# MissingFieldError "Can't find field 'allBooks' on ROOT\_QUERY object"

Trying to solve a cache invalidation issue when new items are added to the db. By default, GraphQL uses the cached results but in this case we want to make a new query (see Part 8.22) every time the new item mutation is made. We do this by adding an 'update' callback to the mutation, which aims to re run the "get all items" query in the cache.

This very vague error comes out when you 
1. forget to declare variables for queries that need variables
2. incorrectly put "null" as a variable instead of null (without the quotes!)

Also note that the cache only contains queries that have been called before! So you must expect that users have called this query before, and not simply gotten a direct link to that page.

# useSubscription hook

useSubscription is a way to be able to interact with subscriptions on the frontend! Link it to a subscription query written in your queries file. 

Please note that the callback onSubscriptionData is called when a subscription event is received. The variable in it MUST be called exactly subscriptionData, then you can do whatever you like with it.
e.g.

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({subscriptionData}) => {
			console.log('I have received new data! More info:', subscriptionData)
		}
	})

# n+1 problem (Part 8.26)

Used dataloader in order to collect/coalesce('batch') separate queries into one, which means less requests is being made to the server.

I used the guidelines from [here](https://github.com/graphql/dataloader) mainly, but other pages like [this](http://www.petecorey.com/blog/2017/08/14/batching-graphql-queries-with-dataloader/) and [this](https://www.robinwieruch.de/graphql-apollo-server-tutorial#graphql-server-data-loader-caching-batching) cover the concepts in more detail pretty thoroughly.

