const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//import all database connection
const Song = require('../models/song');


router.get('/ipa/v1/getall', (req, res, next) => {
    Song.find()
    .exec()
    .then(items => {
        console.log(items);
        res.status(201).json(items);
    })
    .catch(err => {
        res.status(404).json({
            message: 'Sorry, no songs in the database'
        })
    })
});

router.post('/ipa/v1/:findSong', (req, res, next) => {
    const song = req.params.findSong;

    Song.findOne({song})
    .exec()
    .then(result => {
        console.log(result);
        if(result){
            res.status(200).json(result);
        }else {
            res.status(404).json({
                message: "Sorry, this song doesn't exist"
            });
        }
    });
});

router.post('/ipa/v1/add', (req, res, next) => {
    const song = new Song ({
        song: req.body.song,
        artist: req.body.artist,
        year: req.body.year
    });
    song.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            createdSong: result
        });
    })
    .catch(err => {
        res.status(404).json({
            message: 'Sorry, new song, artist, and year fields where not created'
        });
    }); 
});

router.delete('/ipa/v1/:deleteSong', (req, res, next) => {
    const deleteOneSong = req.params.deleteSong;
    Song.deleteOne({song: deleteOneSong})
    .exec()
    .then(result => {
        res.status(200).json({
            deleteOne: result
        });
    })
    .catch(err => {
        res.status(404).json({error: err});
    })
}); 

module.exports = router;

