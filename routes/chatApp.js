const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/login', (req, res) => {

    res.send(`<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="GET">

	<input id="username" type="text" name"title">

	<button type="submit">add</button>

</form>`)

});


router.get('/', (req, res) => {
    fs.readFile('message.txt','utf8', (err, data) => {
        let post = ''
        if(data == ''){
            post = 'undefined'
        }else{
            post = data 
        }
        res.write(
            `<html><body><header><div><h2>${post}<h2></div></header><form onsubmit="document.getElementById('username').value = localStorage.getItem('username')" action="/", method="POST"><input type="text" id= "message" name="message"></input><input type="hidden" id= "username" name="username"></input><br><br><button type="submit">Send</button></form></body></html>`);  
        res.end();
    })
});


router.post ('/', (req, res) => {
    const data =  `${req.body.username}: ${req.body.message} `;
    if(req.body.username && req.body.message){
        fs.appendFile('message.txt', data, (err) => {
            if (err) {
              console.log(err);
            }
        });
        res.redirect('/');
    }
});

module.exports = router;