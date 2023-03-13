const http = require('http');

const server = http.createServer( (req, res) => {
    res.setHeader('Content-Type', 'text/html'); 
    res.write('<html>');
    res.write('<h1> Server </h1>');
    res.write('<p> Server Paragraph</p>');
    res.write('</html>');
    res.end();
});

server.listen(3000);