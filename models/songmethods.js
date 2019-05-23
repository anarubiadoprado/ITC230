const songdb = require('./song');


exports.getAll = () => {
 return songdb.find({}, (err, result) => {
  if (err){
    return err;
  } 
  return result
  });
};

// return a single record
exports.get = (searchMusic) => {
    return songdb.findOne({'song': searchMusic}, (err, result) => {
        if (err){
          return err;
        } else {
          return result;   
        }
    });
};


//a delete method to delete the requested item from your array
exports.delete = (selectedSong) => {
    return songdb.findOneAndDelete({'song': selectedSong }, (err, deleted) => {
        if(err){
          return err;
        }
         return deleted;
    }
    )}; 

exports.count = () => {
    return songdb.countDocuments((err, count) => {
        return count;
    })
}; 



exports.add = (newSong) => {
      songdb.updateOne({'song':''}, newSong, {upsert:true}, (err, result) => {
    if (err){
       return next(err);
      }
      else {
        return result;
      }
    console.log(result);
  // other code here
}); 

     /* let look = songdb.find((oneSong) =>{
          return oneSong.song === newSong.song;
      });
      console.log(look);

      if (look){
        throw new Error ('Error, try a new song');
      } else {
        songdb.push(newSong);
        return newSong;     

     }

      console.log(newSong);*/
};
