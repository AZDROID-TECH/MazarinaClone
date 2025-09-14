const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Mövcud məlumatları təmizlə
  await knex('pages_content').del();
  await knex('site_settings').del();
  await knex('partners').del();
  await knex('brands').del();
  await knex('users').del();

  // Admin istifadəçini yarat - parol bcrypt ilə hash edilir
  const Password_Hash = await bcrypt.hash('Admin5225', 12);
  
  await knex('users').insert([
    {
      id: 1,
      username: 'admin',
      password_hash: Password_Hash,
      role: 'admin',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);

  // Sayt parametrlərini yarat
  await knex('site_settings').insert([
    {
      key: 'contact.phone',
      value: '+994 12 567 45 13',
      type: 'string',
      description: 'Əlaqə telefonu',
      is_editable: true
    },
    {
      key: 'contact.email',
      value: 'info@mazarina.az',
      type: 'string',
      description: 'Əlaqə elektron poçtu',
      is_editable: true
    },
    {
      key: 'contact.address',
      value: 'AZ1029, Azerbaijan Republic, Baku, Str. Alaskar Gaibov, 1222/12',
      type: 'string',
      description: 'Şirkət ünvanı',
      is_editable: true
    },
    {
      key: 'social.facebook',
      value: 'https://facebook.com/mazarina',
      type: 'string',
      description: 'Facebook səhifəsi',
      is_editable: true
    },
    {
      key: 'social.instagram',
      value: 'https://instagram.com/mazarina',
      type: 'string',
      description: 'Instagram səhifəsi',
      is_editable: true
    },
    {
      key: 'company.established_year',
      value: '1998',
      type: 'number',
      description: 'Şirkətin təsis ili',
      is_editable: true
    },
    {
      key: 'stats.years',
      value: '20+',
      type: 'string',
      description: 'İş ili statistikası',
      is_editable: true
    },
    {
      key: 'stats.clients',
      value: '1000+',
      type: 'string', 
      description: 'Müştəri sayı statistikası',
      is_editable: true
    },
    {
      key: 'stats.brands',
      value: '50+',
      type: 'string',
      description: 'Brend sayı statistikası',
      is_editable: true
    },
    {
      key: 'stats.employees',
      value: '100+',
      type: 'string',
      description: 'İşçi sayı statistikası', 
      is_editable: true
    }
  ]);

  // Nümunə brendləri yarat
  await knex('brands').insert([
    {
      id: 1,
      name: 'Gəncə Şərab',
      slug: 'gence-serab',
      description: 'Azərbaycanda ən köhnə şərab istehsalçısı',
      order: 1,
      is_active: true
    },
    {
      id: 2,
      name: 'Premium Wines',
      slug: 'premium-wines',
      description: 'Yüksək keyfiyyətli şərablar',
      order: 2,
      is_active: true
    },
    {
      id: 3,
      name: 'Craft Spirits',
      slug: 'craft-spirits',
      description: 'Əl ilə hazırlanmış alkoqollu içkilər',
      order: 3,
      is_active: true
    }
  ]);

  // Nümunə tərəfdaşları yarat
  await knex('partners').insert([
    {
      id: 1,
      name: 'Gəncə Şərab-2 ASC',
      url: 'https://example.com',
      description: 'Əsas istehsal tərəfdaşımız',
      order: 1,
      is_active: true
    },
    {
      id: 2,
      name: 'International Wine Group',
      url: 'https://example.com',
      description: 'Beynəlxalq şərab qrupu',
      order: 2,
      is_active: true
    },
    {
      id: 3,
      name: 'Distribution Partners LLC',
      url: 'https://example.com',
      description: 'Distribüsiya tərəfdaşı',
      order: 3,
      is_active: true
    }
  ]);
};
