import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getGendersQuery, addWordMutation, getWordsQuery } from '../queries/queries'

class AddWord extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            genderId: ''
        };
    }
    displayGenders(){
        var data = this.props.getGendersQuery;
        if(data.loading){
            return(<option disabled>Loading Genders</option>);
        } else {
            return data.genders.map(gender => {
                return(<option key={gender.id} value={gender.id}>{gender.name}</option>)
            })
        }
    }

    submitForm(e){
        e.preventDefault();
        this.props.addWordMutation({
            variables: {
                name: this.state.name,
                genderId: this.state.genderId
            },
            refetchQueries: [{query: getWordsQuery }]
        });
    }

  render() {
    return (
        <form id="add-word" onSubmit={this.submitForm.bind(this)}>
            <div className="field">
                <label>Word:</label>
                <input type="text" onChange={(e)=> this.setState({ name: e.target.value})} />
            </div>
            <div className="field">
                <label>Gender:</label>
                <select onChange={(e)=> this.setState({ genderId: e.target.value})}>
                    <option>Select gender</option>
                    { this.displayGenders() }
                </select>
            </div>
            <button>+</button>
        </form>        
    );
  }
}

export default compose(
    graphql(getGendersQuery, { name: "getGendersQuery"}),
    graphql(addWordMutation, { name: "addWordMutation"})
)(AddWord);
