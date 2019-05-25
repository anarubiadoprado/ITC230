const cred = require('../credentials');
const mongoose = require('mongoose');

mongoose.connect(cred.connectionString, { dbName: 'scc-projects', useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');

});

// define Songs model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 song: { type: String, required: true },
 artist: String,
 year: Number
}); 

module.exports = mongoose.model('Song', mySchema);

