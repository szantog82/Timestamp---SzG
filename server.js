var http = require("http");
var url = require("url");
var fs = require("fs");

var server = http.createServer(function(request, response) {
  var currpath = JSON.stringify(url.parse(request.url).path);
  var input = decodeURIComponent(currpath.slice(2,currpath.length-1));
  if (currpath.length < 4) {
    fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();
  })
  }
  else {
  response.writeHead(200, {"Content-Type": "text/plain"});
  if (/[a-zA-Z]/.test(input)) {
  var d = new Date(input);
  if (isNaN(d.getTime())) {
    response.write(JSON.stringify({"unix": null, "natural": null}))
  }
  else {response.write(JSON.stringify({"unix": d.getTime().toString(), "natural": input}))}
    
  }
  else {
    var d = new Date(parseInt(input));
    response.write(JSON.stringify({"unix": input, "natural": d.toDateString()}))
    
  }
  response.end();
  }
})

server.listen(process.env.PORT || 8080);
