exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('hero', table => {
            table.increments('id')
                .primary();

            table.string('name', 100)
                .unique();
        })

    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('hero')
    ])
};
