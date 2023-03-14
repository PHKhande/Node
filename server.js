const http = require('http');
const express = require('express');

const app = express();

app.use( (req, res, next) => {
    console.log("In middleware");
    next();
});

app.use( (req, res, next) => {
    console.log("In second middleware");
    res.send('<h1> Hello </h1>')
});

app.listen(3000);