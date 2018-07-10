const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross origin request
app.use(cors());


mongoose.connect('');
mongoose.connection.once('open', ()=> {
    console.log('Conected to db');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000);