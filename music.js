let mySongs = [
    {artist: 'Sublime', song: 'BadFish', year: '1992'},
    {artist: 'Dirtyheads', song: 'Vacation', year: '2017'},
    {artist: 'Slightlystoopid', song: 'Celebrate', year: '2017'},
    {artist: 'Pepper', song: 'Stone Love', year:'2002'},
    {artist: 'Badfish', song: 'Whatever', year: '2006'}
];


exports.getAll = () => {

    return mySongs;

 console.log(getAll(mySongs))
};


exports.get = (artist) => {
  console.log(artist);
    return mySongs.find((item) => {
        return item.artist === artist;
    });
};

/*exports.get = (mySongs) => {
 forEach (var songs of mySongs){
  document.getElementbyId(myMusics).innerHTML = */


//a delete method to delete the requested item from your array
exports.delete = (artist) => {
    let oldLength = mySongs.length;
   let newSongs = mySongs.filter((item) => {
       return item.artist !== artist;
   });
   mySongs = newSongs;
   return{ delete: artist, total: mySongs.length};
};   

