const http = require("http");
http.createServer((req, res) => {
	const path = req.url.toLowerCase();
	switch(path)
	{
		case '/':
			const fs = require("fs");
   			fs.readFile("public/home.html", (err, data) => {
    	    	if (err) return console.error(err);
     			res.end(data.toString());
  			});
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