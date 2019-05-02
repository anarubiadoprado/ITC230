const http = require('http'), fs = require('fs');
const qs = require('querystring');
const music = require('./music.js');

http.createServer((req, res) => {
    const url = req.url.split('?'); //separe route on ? mark
    const query = qs.parse(url[1]); // conver string to obj
	const path = url[0].toLowerCase();
    
	switch(path)
	{
		case '/':
			const fs = require("fs");
   			fs.readFile("public/home.html", (err, data) => {
    	    	if (err) return console.error(err);
     			res.end(data.toString());
  			});
			break;
            
        case '/getall':
			res.end(JSON.stringify(music.getAll()));
			break;
            
        case '/get':
			let found = music.get(query.artist); //get the string 
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let results = (found) ? JSON.stringify(found) : 'Not Found';
            res.end(results);
			break;
            
        case '/delete':
            let exclude = music.delete(query.artist); //get the string 
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let newOutput = (exclude) ? JSON.stringify(exclude) : 'Not found ';
            res.end(newOutput);
			break;

		case '/about':
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('This is the about page. This app is the first of many from mine JavaScript class!');
			break;

		default:
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.end('Sorry, Page not found');
			break;
		}

}).listen(process.env.PORT || 3000);

