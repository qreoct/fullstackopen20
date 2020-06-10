const { PubSub, ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const config = require('./config')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const DataLoader = require('dataloader');

const batchGetBooks = async (authors) => {
  console.log('BATCHGETBOOKS: has been called')
  const res = await authors.map(async a => {
      const books = await Book.find({author: a})
      return books.length
  })
  return res
}
const booksLoader = new DataLoader(authors => batchGetBooks(authors))

// pubsub required for creating subscriptions
const pubsub = new PubSub() 
// jwt required for login (jwt_secret in config.JWT_SECRET)
const jwt = require('jsonwebtoken')

mongoose.set('useFindAndModify', false)
console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('library-backend.js: error connecting to MongoDB -', error.message)
  })


const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    books: [Book!]!
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    findBook(title: String!): Book
    allAuthors: [Author!]!
    me: User
    allUsers: [User!]!
  }
  type Mutation {
    addBook(  
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => {
      return Book.collection.countDocuments()
    },
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(!args.author && !args.genre){
        console.log('QUERY: ALLBOOKS: nofilter')
        // if no filters provided
        return await Book.find({}).populate('author', {name:1, born:1})
      }else if(args.author && args.genre){
        console.log('QUERY: ALLBOOKS: both auth and genre')
        return await Book.find({ author: args.author, genres: args.genre})
/*        return books.filter(b => b.author === args.author 
                              && b.genres.includes(args.genre))*/
      }else if(args.author){
        console.log('QUERY: ALLBOOKS: only auth')
        return await Book.find({ author: args.author })
        //return books.filter(b => b.author === args.author)
      }else if(args.genre){
        console.log('QUERY: ALLBOOKS: running search with genre:',args.genre)
        genreB = await Book.find({ genres: args.genre }).populate('author', {name:1, born:1})
        return genreB
      }
    },
    findBook: async (root, args) => await Book.findOne({ title: args.title }).populate('author', {name:1, born:1}),
    allAuthors: () => {
      console.log("QUERY: ALLAUTHORS: is called ")
      return Author.find({}).populate('books', {title:1})
    },
    me: async (root, args, context) => {
      console.log('query me called, returning', context.currentUser)
      return context.currentUser
    },
    allUsers: () => User.find({})
  },
  Author: {
    bookCount: async (root) => {
      const bookc = await booksLoader.load(root)
      return bookc
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new AuthenticationError('library-backend (editAuthor) Not authenticated!')
      }
      // if author is not in db yet, add it to the list
      console.log('addbook is being called!!')
      console.log(args)
      if(!args) { throw new UserInputError('library-backend (addBook) Arguments missing!')}

      let author = await Author.findOne({name: args.author})
      if (!author || author.length === 0){
        author = new Author({ name: args.author, born: null })
        console.log('new author created, info: --------- ', author)
        await author.save()
      }
      try {
        const book = new Book({ ...args, author: author })
        await book.save()
        console.log('book object created ', book)

        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new AuthenticationError('library-backend (editAuthor) Not authenticated!')
      }
      if(args.name === '' || args.setBornTo === 0) {
        throw new UserInputError('library-backend (editAuthor) Bad arguments! Please check.', {args})
      }

      aToChange = await Author.find({ name: args.name })
      if(aToChange.length === 0){ return null }
      try { const updatedAuthor = await Author.updateOne(
          { name: { $in : args.name} },
          { $set: { born: args.setBornTo}}
        )
      // because somehow calling updateOne doesn't return the modified object
      return await Author.findOne({name: args.name})
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      console.log('running createuser! ', user)
      return user.save()
        .catch(e => {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'hunter2' ){
        throw new UserInputError("library-backend (login mutation) wrong credentials!")
      }

      console.log('attempting login with user ', user)

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign( userForToken, config.JWT_SECRET )}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})