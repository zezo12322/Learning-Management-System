const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'optimatech',
  password: 'optimatech_dev',
  database: 'optimatech_lms'
});

async function run() {
  const res = await pool.query('SELECT id, "videoUrl" FROM "CourseLecture"');
  console.log(res.rows);
  pool.end();
}
run().catch(console.error);
