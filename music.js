let mySongs = [
    {artist: 'Sublime', song: 'BadFish', year: '1992'},
    {artist: 'Dirty Heads', song: 'Vacation', year: '2017'},
    {artist: 'Dirty Heads', song: 'Celebrate', year: '2017'},
    {artist: 'Slightly Stoopid', song: '2 AM ', year: '2007'},
    {artist: 'Pepper', song: 'Stone Love', year:'2002'},
];


exports.getAll = () => {

    return mySongs;

 console.log(getAll(mySongs))
};


exports.get = (song) => {
  console.log(song);
    return mySongs.find((item) => {
        return item.song === song;
    });
};

/*exports.get = (mySongs) => {
 forEach (var songs of mySongs){
  document.getElementbyId(myMusics).innerHTML = */


//a delete method to delete the requested item from your array
exports.delete = (song) => {
    let oldLength = mySongs.length;
   let newSongs = mySongs.filter((item) => {
       return item.song !== song;
   });
   mySongs = newSongs;
   return{ delete: song, total: mySongs.length};
};   

exports.add = (newSong) => {
      let look = mySongs.find((oneSong) =>{
          return oneSong.song === newSong.song;
      });
      console.log(look);

      if (look){
        throw new Error ('Error, try a new song');
      } else {
        mySongs.push(newSong);
        return newSong;     

     }

      console.log(newSong);
};
