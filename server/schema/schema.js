const graphql = require('graphql');
const _ = require('lodash')
const Word = require('../models/word');
const Gender = require('../models/gender');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull } = graphql;

//dummy
/*var words = [
    {name: 'Hallo', id: '1', genderId: "1"},
    {name: 'Hunde', id: '2', genderId: "2"}
]

var genders = [
    {name: 'Masculine', id: '1'},
    {name: 'Neuter', id: '2'},
    {name: 'Femenine', id: '3'},
]*/

const WordType = new GraphQLObjectType({
    name: 'Word',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        gender: {
            type: GenderType,
            resolve(parent, args) {
                return Gender.findById(parent.genderId);
                //return _.find(genders, {id: parent.genderId});
            }
        }
    })
});

const GenderType = new GraphQLObjectType({
    name: 'Gender',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        words: {
            type: GraphQLList(WordType),
            resolve(parent, args) {
                return Word.find({genderId: parent.id});
                //return _.filter(words, {genderId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        word: {
            type: WordType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Word.findById(args.id);
                // code to get data from db
                //return _.find(words, {id: args.id});
            }
        },
        gender: {
            type: GenderType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Gender.findById(args.id);
                //return _.find(genders, {id: args.id });
            }
        },
        words: {
            type: new GraphQLList(WordType),
            resolve(parent, args){
                return Word.find({});
                //return words;
            }
        },
        genders: {
            type: new GraphQLList(GenderType),
            resolve(parent, args){
                return Gender.find({});
                //return genders;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addGender: {
            type: GenderType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parents, args) {
                let gender = new Gender({
                    name: args.name,
                });
               return gender.save();
            }
        },
        addWord: {
            type: WordType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genderId: { type:new GraphQLNonNull(GraphQLID) }
            },
            resolve(parents, args) {
                let word = new Word({
                    name: args.name,
                    genderId: args.genderId
                });
               return word.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})