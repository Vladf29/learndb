'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const {
    MongoClient
} = require('mongodb');

const app = express();
const urldb = 'mongodb://localhost:27017';

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.route('/api/users')
    .get((req, res) => {
        MongoClient.connect(urldb, (err, client) => {
            if (err) return console.log(err);

            const db = client.db('usersdb');
            const collection = db.collection('users');

            collection.find({}).toArray((err, users) => {
                if (err) return res.status(400).send();

                res.json(users);
                client.close();
            });
        });

    })
    .post((req, res) => {
        if (!req.body) return res.status(400).send();

        const user = {}
        user.name = req.body.name;
        user.age = req.body.age;

        MongoClient.connect(urldb, (err, client) => {
            if (err) return console.log(err);

            const db = client.db('usersdb');
            const collection = db.collection('users');

            collection.insertOne(user, (err, result) => {
                if (err) return res.status(400).send();

                res.send('OK');
                client.close();
            });
        });

    })

app.listen(3000);