/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('brands', function(table) {
    table.increments('id').primary(); // PK - avtomatik id generasiyası
    table.string('name', 100).notNullable(); // Brend adı mütləq olmalıdır
    table.string('slug', 100).unique(); // URL üçün slug formatı
    table.text('description'); // Brendin təsviri (mətnli)
    table.string('logo_path'); // Logo faylının yolu
    table.integer('order').defaultTo(0); // Göstərilmə sırası
    table.boolean('is_active').defaultTo(true); // Aktiv/deaktiv statusu
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Yaradılma tarixi
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Yenilənmə tarixi
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('brands'); // Cədvəli sil
};
