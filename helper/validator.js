'use strict'

const Joi = require('joi');

module.exports = {
    validator: function (schema) {
        return (req, res, next) => {
            if (!req.body) return res.status(400).send();
            const result = Joi.validate(req.body, schema);
            if (result.error) return res.status(400).send(result.error.message);
            next();
        }
    },
    schemas: {
        name: Joi.string().min(2).required(),
        age: Joi.string().min(2).required()
    }
}