const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/' && method === 'GET'){
        res.write('<body> <form action = "/" method = "POST"> <input type="text" name="message"> <button type="submit"> SEND </button> </form></body>');
        res.end();
    }
    else if(url === '/' && method === 'POST'){
        const body = [];
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

};

module.exports = requestHandler;

