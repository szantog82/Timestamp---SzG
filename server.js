var http = require("http");
var url = require("url");

var server = http.createServer(function(request, response) {
  var currpath = JSON.stringify(url.parse(request.url).path);
  var input = decodeURIComponent(currpath.slice(2,currpath.length-1));
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
})
server.listen(8888);
