'use strict';

const {
    MongoClient
} = require('mongodb');

const urldb = 'mongodb://localhost:27017';

module.exports = {
    get: (req, res) => {
        MongoClient.connect(urldb, (err, client) => {
            if (err) return res.status(400).send();

            const db = client.db('usersdb');
            const collection = db.collection('users');

            collection.find({}).toArray((err, users) => {
                if (err) return res.status(400).send();
                res.json(users);
                client.close();
            });
        });
    },
    post: (req, res, next) => {
        if (!req.body) return res.status(400).send();
        MongoClient.connect(urldb, (err, client) => {
            if (err) return res.status(400).send();

            const db = client.db('usersdb');
            const collection = db.collection('users');

            collection.insertOne(req.body, (err, result) => {
                if (err) return res.status(400).send();
                next();
                client.close();
            });
        });
    },
    put: (req, res, next) => {
        if (!req.body) return res.status(400).send();
        const user = req.body;

        MongoClient.connect(urldb, (err, client) => {
            if (err) return res.status(400).send();

            const db = client.db('usersdb');
            const collection = db.collection('users');

            collection.findOneAndUpdate(user.old, user.new, (err, result) => {
                if (err) return res.status(400).send();

                next();
                client.close();
            });
        });
    },
    delete: (req, res, next) => {
        if (!req.body) return res.status(400).send();

        MongoClient.connect(urldb, (err, client) => {
            if (err) return res.status(400).send();

            const db = client.db('usersdb');
            const collection = db.collection('users');

            collection.findOneAndDelete(req.body, (err, result) => {
                if (err) return res.status(400).send();
                next();
                client.close();
            });
        });
    }
}