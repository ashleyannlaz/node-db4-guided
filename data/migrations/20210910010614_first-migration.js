// 0. create this file npx knex migrate:make first-migration
// 1. change to async
// 2. create tables
// 3. down in reverse
// 4. npx knex migrate:up
// 5. npx knex migrate:down
// 6. npx knex seed:run
exports.up = async function (knex) {
  await knex.schema
    .createTable("zoos", (table) => {
      table.increments("zoo_id");
      table.string("zoo_name", 128).notNullable();
      table.string("address", 255).notNullable().unique();
    })
    .createTable("species", (table) => {
      table.increments("species_id");
      table.string("species_name", 350).notNullable();
    })
    .createTable("animals", (table) => {
      table.increments("animal_id");
      table.string("animal_name", 150).notNullable();
      table
        .integer("species_id")
        .unsigned()
        .notNullable()
        .references("species_id")
        .inTable("species")
        .onDelete("RESTRICT") // CASCADE DELETES OTHER RECORDS ASSOCIATED
        .onUpdate("RESTRICT");
    })
    .createTable("zoo_animals", (table) => {
      table.increments("zoo_animal_id");
      table.timestamps(true, true);
      table
      .integer("zoo_id")
      .unsigned()
      .notNullable()
      .references("zoo_id")
      .inTable("zoos")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");
      table
      .integer("animal_id")
      .unsigned()
      .notNullable()
      .references("animal_id")
      .inTable("animals")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");
    });
};

exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists("zoo_animals")
    .dropTableIfExists("animals")
    .dropTableIfExists("species")
    .dropTableIfExists("zoos");
};
