const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
dotenv.config({ path: './config.env' });

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

const dbLocal = process.env.DATABASE_LOCAL;

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const port = process.env.PORT || 5000;

mongoose
  .connect(db, {
    // .connect(dbLocal, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Connected to MongoDB → ${db}`);
    // console.log(`Connected to MongoDB → ${dbLocal}`);
    return server.listen({ port });
  })
  .then((res) => {
    console.log(`Server running at → ${res.url}`);
  })
  .catch((err) => console.error(err));
