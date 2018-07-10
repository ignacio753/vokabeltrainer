const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    name: String,
    genderId: String
});

module.exports = mongoose.model('Word', wordSchema);