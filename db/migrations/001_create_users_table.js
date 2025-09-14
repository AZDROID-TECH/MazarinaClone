/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary(); // PK - avtomatik id generasiyası
    table.string('username', 50).unique().notNullable(); // İstifadəçi adı unikal olmalıdır
    table.string('password_hash', 255).notNullable(); // bcrypt hash saxlanır 
    table.string('role', 20).defaultTo('admin'); // Rolu admin olaraq təyin edilir
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Yaradılma tarixi
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Yenilənmə tarixi
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users'); // Cədvəli sil
};
