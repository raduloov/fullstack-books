// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, Content-Type, Accept, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//   next();
// });

// app.use(bodyParser.json());

// app.listen(8080);

const { ApolloServer } = require('apollo-server-express');
const express = require('express');

const app = express();

const server = new AppoloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: 8080 }, () => {
  console.log('SERVER RUNNING ON PORT 8080');
});
