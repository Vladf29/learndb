'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', require('./router/users'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.use(express.static(path.resolve(__dirname, 'public')));
app.listen(3000);