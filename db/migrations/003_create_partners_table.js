/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('partners', function(table) {
    table.increments('id').primary(); // PK - avtomatik id generasiyası
    table.string('name', 100).notNullable(); // Tərəfdaş şirkətinin adı
    table.string('url'); // Tərəfdaşın veb saytı
    table.string('logo_path'); // Logo faylının yolu  
    table.integer('order').defaultTo(0); // Göstərilmə sırası
    table.boolean('is_active').defaultTo(true); // Aktiv/deaktiv statusu
    table.text('description'); // Tərəfdaş haqqında əlavə məlumat
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Yaradılma tarixi
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Yenilənmə tarixi
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('partners'); // Cədvəli sil
};
