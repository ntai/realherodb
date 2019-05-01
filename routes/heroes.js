const express = require('express');
let router = express.Router();
const promise = require('bluebird');
const initOptions = { promiseLib: promise }; // overriding the default (ES6 Promise);
const pgp = require('pg-promise')(initOptions);
const SqlString = require('sqlstring');

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'testdb',
  user: 'ntai'
};

const connection = pgp(cn);

router.route('/')
    .get((req, res, next) => {
        let statement = 'select * from hero';
        // "E" + SqlString makes it as Posix SQL escaped string for postgresql
        if (req.query.name) statement = statement + " where name like E" + SqlString.escape("%"+req.query.name+"%");
        statement = statement + ' order by id';
        console.log("Q: " + statement);
        connection.any(statement)
            .then(function (data) {
                res.status(200)
                    .json(data);
                })
            .catch(function (err) {
                // console.log(statement);
                return next(err);
            })
    })
    .post((req, res, next) => {
        connection.one("insert into hero(name) values(E$1) returning id, name", [SqlString.escape(req.body.name)])
            .then(function (data) {
                res.status(200)
                    .json(data);
            })
            .catch( function(err) {
                console.error(err);
                return next(err);
            })
    });

router.route('/:id')
    .get((req, res, next) => {
        const id = parseInt(req.params.id);
        connection.one('select * from hero where id = $1', id)
            .then(function (data) {
                res.status(200)
                    .json(data);
            })
            .catch(function (err) {
                return next(err);
            });
    })
    .delete((req, res, next) => {
        const id = parseInt(req.params.id);
        connection.none('delete from hero where id = $1', id)
            .then(function(data) {
                res.status(200)
                    .json(data);
            })
            .catch( function(err) {
                return next(err);
            });
    })
    .put((req, res, next) => {
        const id = parseInt(req.params.id);
        connection.none('update hero set name=E$2 where id = $1', [id, SqlString.escape(req.body.name)])
            .then(function(data) {
                res.status(200)
                    .json(data);
            })
            .catch( function(err) {
                return next(err);
            });
    })
;

module.exports = router;

