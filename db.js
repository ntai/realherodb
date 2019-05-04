"use strict";

const knex = require('knex');

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'testdb',
    user: 'ntai',
    password: ''
};


class DBManager {
    constructor() {
        this.knex = knex({
            client: 'pg',
            connection: {
                host: cn.host,
                user: cn.user,
                password: cn.password,
                database: cn.database
            },
            migrations: {
                directory: './db'
            },
            debug: true
        });
    }

    initialize() {
        this.knex.migrate.latest()
            .then( console.log("init db"))
            .catch(err => console.error(err));
    };

    get connection() {
        return this.knex;
    }
}

module.exports = new DBManager();
