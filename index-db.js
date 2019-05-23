const Song = require('./models/song.js');


//get number of mongoDB documents
Song.countDocuments((err, result) => {
   if (err) {
       console.log(err); //output error if one occurred
   } else {
       console.log('total number of mongoDB docs: ' + result); //otherwise print number of mongoDB documents in database
   }
});

// find all documents
Song.find((err, result) => {
   if (err) {
       console.log(err); //output error if one occurred
   } else {
       console.log('array of mongoDB docs: \n' + result); //otherwise output the array of documents
   }
});

