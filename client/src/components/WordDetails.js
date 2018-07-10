import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class WordDetails extends Component {
    displayBookDetails(){
        const { word } = this.props.data;
        if (word) {
            return(
              <div>
                  <h2>{word.name}</h2>
                  <p>{word.gender.name}</p>
                  <p> All words with this gender </p>
                  <ul className="other-words">
                      { word.gender.words.map(item => {
                          return <li key={item.id}>{item.name}</li>
                      })}
                  </ul>
              </div>
            )
        } else {
            return(
                <div>No book selected...</div>
            )
        }
    }

  render() { 
    return (
      <div id="word-details">
        {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.wordId
            }
        }
    }

})(WordDetails);
