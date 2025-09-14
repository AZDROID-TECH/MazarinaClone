/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('pages_content', function(table) {
    table.increments('id').primary(); // PK - avtomatik id generasiyası  
    table.string('page_key', 50).notNullable(); // Səhifə açarı (home, about, vs.)
    table.string('locale', 5).notNullable(); // Dil kodu (az, en, ru)
    table.json('content_json'); // JSON formatında səhifə məzmunu
    table.boolean('is_active').defaultTo(true); // Aktiv/deaktiv statusu
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Yaradılma tarixi
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Yenilənmə tarixi
    
    // Kompozit unikal açar - eyni səhifə və dil kombinasiyası təkrar olmasın
    table.unique(['page_key', 'locale']); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('pages_content'); // Cədvəli sil
};
