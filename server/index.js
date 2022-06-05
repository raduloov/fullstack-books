const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const auth = require('./middleware/auth');

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use(auth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    formatError(err) {
      if (!err.originalError) {
        return err;
      }

      const data = err.originalError.data;
      const message = err.message || 'An error occurred.';
      const code = err.originalError.code || 500;

      return { message: message, status: code, data: data };
    }
  })
);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(
    'mongodb+srv://raduloov:JSxfUO7hqJw0fH88@cluster0.yejom.mongodb.net/fullstackBooks?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(PORT);
    console.log(`SERVER RUNNING AT PORT ${PORT}`);
  })
  .catch(err => console.log(err));
