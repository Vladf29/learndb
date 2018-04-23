'use strict'

const express = require('express');
const router = express.Router();

const dbUsers = require('../db/users');

router.route('/users')
    .get(dbUsers.get)
    .post(dbUsers.post, (req, res) => {
        res.send('OK');
    })
    .put(dbUsers.put, (req, res) => {
        res.send('OK');
    })
    .delete(dbUsers.delete, (req, res) => {
        res.send('OK');
    })

module.exports = router;