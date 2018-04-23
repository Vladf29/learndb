'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', require('./router/users'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(3000);