const { Pool } = require('pg');

const PG_URI =
  'postgres://jkmtgrbv:XRtbAwbMbtb27hp9Sghydzr5kE3B6CLJ@suleiman.db.elephantsql.com:5432/jkmtgrbv';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
