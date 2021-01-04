const { ApolloServer } = require('apollo-server');

const mongoose = require('mongoose');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');
const { MONGODB_URL } = require('./config');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.debug('Mongodb Connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
