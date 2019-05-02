let mySongs = [
    {artist: 'sublime', song: 'BadFish', year: '1992'},
    {artist: 'dirtyheads', song: 'Vacation', year: '2017'},
    {artist: 'slightlystoopid', song: 'Celebrate', year: '2017'},
    {artist: 'pepper', song: 'Stone Love', year:'2002'},
    {artist: 'badfish', song: 'Whatever', year: '2006'}
];

exports.getAll = () => {
    return mySongs;

 console.log(getAll(mySongs))
};


exports.get = (artist) => {
    let found = mySongs.find((item) => {
        return item.artist === artist;
    });
    console.log(found);

};

//a delete method to delete the requested item from your array
exports.delete = (artist) => {
   let indexNumber = mySongs.findIndex((item) => {
       return item.artist === artist;
   });
   if (indexNumber > -1) {
      mySongs.splice(indexNumber);
      return true;
   } else {
       return false;
   }

   console.log(indexNumber)
};   

