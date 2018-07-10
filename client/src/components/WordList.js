import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getWordsQuery } from '../queries/queries'


// components
import WordDetails from './WordDetails';

class WordList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }
    displayBooks(){
        var data = this.props.data;
        if(data.loading) {
            return(<div>Loading Words...</div>)
        } else {
            return data.words.map(word => {
            return(
                <li key={word.id} onClick={(e)=> {this.setState({selected: word.id})}}>{word.name}</li>
            )
            });
        }
    }
  render() {
    return (
      <div>
        <ul id="word-list">
            {this.displayBooks()}
        </ul>
        <WordDetails wordId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getWordsQuery)(WordList);
