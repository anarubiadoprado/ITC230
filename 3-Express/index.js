'use strict'
const express = require('express');
const app = express();
const qs = require('querystring');
const bodyParser = require("body-parser")
const music = require('./music.js');
const path = require('path');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.use(express.static('public')); // set location for static files
  
const handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html"); 
	
			// send static file as response
		app.get('/', (req, res) => {
	 		//res.type('text/html')

	 		let allSongs = (JSON.stringify(music.getAll()));
			res.render('home', {title: 'All Songs', result: allSongs});
			});

        app.get('/getall', (req, res) => {
			res.end(JSON.stringify(music.getAll()));
			});
			
      app.get('/get', (req, res) => {
         const url = req.url.split('?'); //separe route on ? mark
    	 const query = qs.parse(url[1]); // conver string to obj
		  const path = url[0].toLowerCase();
			let found = music.get(query.artist); //get the string 
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let results = (found) ? JSON.stringify(found) : 'Not Found';
            res.end(results);
        });

        app.post('/detail', (req, res) => {
        	console.log(req.body.searchMusic);
			let found = music.get(req.body.searchMusic); //get the string 
        	res.render('detail', {title: req.body.searchMusic, result: found});
		});

		/*app.post('/views/detail', (req, res) => {
        	let search = req.body.searchMusic;
        	res.redirect('/views/detail' + search);
        });*/
            
        app.get('/delete', (req, res) => {
        	console.log(req.query.artist);
        	const url = req.url.split('?'); //separe route on ? mark
    	 	const query = qs.parse(url[1]); // conver string to obj
            let results = music.delete(req.query.artist);
            console.log(results);
			res.render('delete', {title: req.query.artist, result: results });
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