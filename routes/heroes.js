const express = require('express');
let router = express.Router();
const vdb = require('../db.js');
const connection = vdb.connection; // knex

router.route('/')
    .get((req, res, next) => {
        let statement = connection('hero').select().orderBy('id');

        if (req.query.name) {
            statement.andWhere( 'name', 'like', '%' + req.query.name + '%');
        }

        statement
            .then( function (data) {
                res.status(200)
                    .json(data);
            })
            .catch(function (err) {
                // console.log(statement);
                return next(err)});
    })
    .post((req, res, next) => {
        connection('hero').insert({name: req.body.name}).returning(["id", "name"])
            .then(function(data)
            {
              res.status(200).json(data);
            })
            .catch( err => {
                console.error(err);
                return next(err);
            })
    });

router.route('/:id')
    .get((req, res, next) => {
        const id = parseInt(req.params.id);
        connection('hero').select().where('id', '=', id)
            .first()
            .then(function(data) {
                res.status(200).json(data);
            })
            .catch(err => next(err))
    })
    .delete((req, res, next) => {
        const id = parseInt(req.params.id);
        connection('hero').delete().where('id', '=', id)
            .then(function(data) {
                res.status(200)
                    .json(data);
            })
            .catch( function(err) {
                next(err);
            });
    })
    .put((req, res, next) => {
        const id = parseInt(req.params.id);
        connection('hero')
            .where( {id: id})
            .update( {name: req.body.name} )
            .then(function(data) {
                res.status(200)
                    .json(data);
            })
            .catch( function(err) {
                return next(err);
            });
    });

module.exports = router;

