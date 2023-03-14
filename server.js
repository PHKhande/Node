const http = require('http');
const fs = require('fs');

const server = http.createServer( (req, res) => {
    const url = req.url;
    const method = req.method;
    const body = [];
    if(url === '/' && method === 'GET'){
        const show = fs.readFileSync('message.txt');
        res.write(`<body> <h4>${show} </h4>`)
        res.write('<form action = "/" method = "POST"> <input type="text" name="message"> <button type="submit"> SEND </button> </form></body>');
        res.end();
    }
    else if(url === '/' && method === 'POST'){
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            fs.writeFile('message.txt', parsedBody.split('=')[1], () => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            })
        })
        
    }
});

server.listen(3000);