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

router.get('/ipa/v1/:findSong', (req, res, next) => {
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
    console.log(req.body);
    Song.updateOne({'song': req.body.song}, req.body, {upsert:true}, (err, result) => {
        res.status(201).send(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(404).json({
            message: 'Sorry, new song, artist, and year fields where not created'
        });
    });
}); 
 
   /*  const newSong = new Song ({
        artist: req.body.artist,
        song: req.body.song,
        year: req.body.year,
    });
    newSong.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Your song, artist, and year were updated.'
        });
    })
    .catch(err => {
        res.status(404).json({
            message: 'Sorry, new song, artist, and year fields where not created'
        });
    });  
});
 */
router.get('/ipa/v1/delete/:deleteSong', (req, res, next) => {
    const deleteOneSong = req.params.deleteSong;
    Song.remove({song: deleteOneSong})
    .exec()
    .then(result => {
        res.status(200).json({
            remove: result
        });
    })
    .catch(err => {
        res.status(404).json({error: err});
    })
}); 

module.exports = router;

