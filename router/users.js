'use strict'

const express = require('express');
const router = express.Router();

const dbUsers = require('../db/users');
const {
    validator,
    schemas
} = require('../helper/validator');

router.route('/users')
    .get(dbUsers.get)
    .post(validator(schemas), dbUsers.post, (req, res) => {
        res.send('OK');
    })
    .put(validator(schemas), dbUsers.put, (req, res) => {
        res.send('OK');
    })
    .delete(dbUsers.delete, (req, res) => {
        res.send('OK');
    })

module.exports = router;