
exports.up = function(knex) {
    return knex.schema
    .createTable("zoos", tbl=>{
        tbl.increments("zoo_id")
        tbl.string("zoo_name",128).notNullable()
        tbl.string("address",128).notNullable().unique()
    })
    .createTable("species",tbl=>{
        tbl.increments("species_id")
        tbl.string("spcies_name",128).notNullable().unique()
    })
    .createTable("animals",tbl=>{
        tbl.increments("animal_id")
        tbl.string("animal_name",128).notNullable()
        tbl.integer("species_id")
            .unsigned()
            .notNullable()
            .references("species_id")
            .inTable("species")
            .onDelete("CASCADE") //referenctial integrity
    })
    .createTable()
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists()
    .dropTableIfExists("animals")
    .dropTableIfExists("species")
    .dropTableIfExists("zoos")
};
