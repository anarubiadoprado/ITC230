'use strict'
const express = require('express');
const app = express();
const qs = require('querystring');
const bodyParser = require("body-parser");
const music = require('./music.js');

const songMethods = require('./models/songmethods');
const songdb = require('./models/song');
const path = require('path');
const {check, validationResult } = require('express-validator/check');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.use(express.static('public')); // set location for static files
  
const handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html"); 

const createValidator = [
	check('name')
		.isLength({ min: 2 }),
	check('song')
		.exists(),
	check('year')
		.isInt({ min: 1000, max: 3000 })	
	];
	
			// send static file as response
		app.get('/', (req, res) => {
	 		res.type('text/html')
	 		res.sendFile(__dirname +'/views/home.html');
	 	});

	 	app.get('/getall', (req, res, next) => {
		    songdb.find({}, (err, result) => {
				if(err) return next (err);
				console.log(result)
			res.end(JSON.stringify(result));
		  });
		});
	 	
 		 
      app.get('/get', (req, res) => { 
			let found = songMethods.get(req.query.song); //get the string 
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let results = (found) ? JSON.stringify(found) : 'Not Found';
            res.end(results);
        });

        app.post('/detail', (req, res, next) => {
        	 songMethods.get(req.body.searchMusic).then((result) => {
        	 	res.render('detail', {result: result});
        	 	console.log(result);
        	 }).catch((err) => {
        	 	return next(err);
        	 });        	
		});

		app.post('/songs', (req, res, next) => {
			songdb.updateOne({'song': req.body.song}, req.body, {upsert:true}, (err, result) => {
				res.status(201).send(result);
			}).catch((err) => {
				return next(res.status(400).send({msg: 'Sorry, song already exist. Please, try again.'}));
			});
		});
            
        app.get('/delete', (req, res, next) => {
        	console.log(req.query.song);
            songMethods.delete(req.query.song).then((result) => {
            	songMethods.count().then((count) => {
            		res.render('delete', {result: req.body.song , count});
            	})
            });
        }); 
            
		// send plain text response
		app.get('/about', (req, res) => {
			 res.type('text/plain');
			 res.send('About page');
		});

		// define 404 handler
		app.use( (req,res) => {
		 res.type('text/plain'); 
		 res.status(404);
		 res.send('404 - Not found');
		});


app.listen(app.get('port'), () => {
 console.log('Express started'); 
});
