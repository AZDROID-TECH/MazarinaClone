/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('site_settings', function(table) {
    table.increments('id').primary(); // PK - avtomatik id generasiyası
    table.string('key', 100).unique().notNullable(); // Açar adı dot.notation formatında
    table.text('value'); // Dəyər JSON və ya mətn formatında saxlanır
    table.string('type', 20).defaultTo('string'); // Dəyər tipi: string, json, number, boolean
    table.text('description'); // Parametrin açıqlaması
    table.boolean('is_editable').defaultTo(true); // Admin tərəfindən redaktə oluna bilərmi
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Yaradılma tarixi
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Yenilənmə tarixi
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('site_settings'); // Cədvəli sil
};
