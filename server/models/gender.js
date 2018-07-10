const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genderSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Gender', genderSchema);