const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// Graphql-Express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')


// Something new
require('dotenv').config({ path: 'variables.env' })
const Recipe = require('./models/Recipe')
const User = require('./models/User')

const { typeDefs } = require('./schema')
const { resorvers } = require('./resolvers')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})



// Connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err))

const app = express()
// Create GraphiQL application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// Connect Schemas with Graphwl
app.use('/graphql', graphqlExpress({
  schema,
  context: {
    Recipe,
    User
  }
}))

const PORT = process.env.PORT || 4444

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
})

