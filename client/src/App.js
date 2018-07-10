import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import WordList from './components/WordList';
import AddWord from './components/AddWord';

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="main">
          <h1>Vokabeltrainer</h1>
          <WordList/>
          <AddWord/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
