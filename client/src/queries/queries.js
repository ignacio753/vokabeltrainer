import { gql } from 'apollo-boost';

const getWordsQuery = gql`
{
    words{
        name
        id
    }
}
`

const getGendersQuery = gql`
{
    genders{
        name
        id
    }
}
`

const addWordMutation = gql`
    mutation($name: String!, $genderId: ID!) {
        addWord(name: $name, genderId: $genderId) {
            name
            id
        }
    }
`

const getBookQuery = gql`
    query($id: ID){
        word(id: $id) {
            id
            name
            gender{
                name
                words{
                    name
                    id
                }
            }
        }
    }
`

export { getWordsQuery, getGendersQuery, addWordMutation, getBookQuery };