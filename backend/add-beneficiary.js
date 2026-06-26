const dotenv = require('dotenv');
const postgres = require('postgres');
const path = require('path');

const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

async function add() {
  try {
    const userId = '0ce83011-3ffa-4d84-a1a5-9cb7036d1e1e';
    const beneficiary = {
      user_id: userId,
      wallet_address: '0x9999999999999999999999999999999999999999',
      email: 'nothingsubodh@gmail.com',
      name: 'Subodh Nominee',
      share_percentage: 100,
      relationship: 'Friend',
      is_verified: true,
      is_active: true
    };
    
    await sql`
      INSERT INTO beneficiaries (user_id, wallet_address, email, name, share_percentage, relationship, is_verified, is_active)
      VALUES (${beneficiary.user_id}, ${beneficiary.wallet_address}, ${beneficiary.email}, ${beneficiary.name}, ${beneficiary.share_percentage}, ${beneficiary.relationship}, ${beneficiary.is_verified}, ${beneficiary.is_active});
    `;
    console.log('Beneficiary inserted successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

add();
