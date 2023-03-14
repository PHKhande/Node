const http = require('http');
const fs = require('fs');

const server = http.createServer( (req, res) => {
    const url = req.url;
    const method = req.method;
    const body = [];
    if(url === '/'){
        res.write('<body><form action = "/message" method = "POST"> <input type="text" name="message"> <button type="submit"> SEND </button> </form></body>');
        res.end();
    }
    else if(url === '/message' && method === 'POST'){
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            fs.writeFile('message.txt', parsedBody, ()=> {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            })
        })
        
    }
});

server.listen(3000);