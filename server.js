const express = require('express');
const { graphqlHTTP } = require('express-graphql')

const schema = require('./schema');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen('3300', () => {
    console.log('server is running')
});