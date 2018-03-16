const Promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: Promise,
});
const { createData } = require('./createData');

// create connection
const cn = {
  user: 'hanyuzhu',
  host: 'localhost',
  database: 'bookings',
  password: 'password',
  port: 5432,
};
const client = pgp(cn);

// create table if not exist
const createTable = 'CREATE TABLE IF NOT EXISTS bookings '
+ '(id INTEGER PRIMARY KEY, '
+ 'unavailable_dates TEXT[], '
+ 'rating INTEGER, '
+ 'rating_count INTEGER, '
+ 'guest_max INTEGER, '
+ 'cost INTEGER, '
+ 'min_stay INTEGER, '
+ 'max_stay INTEGER, '
+ 'children_allowed BOOLEAN'
+ ')';

// batch insert function for 1000 data
function batchInsert(index) {
  const cs = new pgp.helpers.ColumnSet(
    ['id', 'unavailable_dates', 'rating', 'rating_count', 'guest_max', 'cost', 'min_stay', 'max_stay', 'children_allowed'],
    { table: 'bookings' },
  );
  const data = [];
  const insertionCount = 1000;
  for (let i = 0; i < insertionCount; i++) {
    data.push(createData(i + index));
  }
  const query = pgp.helpers.insert(data, cs);
  return client.none(query)
    .then(() => console.log(`inserted ${insertionCount + index} data entries`));
}

// the finale
async function batchInsertNTimes(n) {
  for (let i = 0; i < n; i++) {
    await batchInsert(i * 1000);
  }
  console.log('batch insert complete');
}

client.none(createTable)
  .then(() => console.log('table created'))
  .then(() => batchInsertNTimes(2))
  .catch(e => console.log('table creation failed ', e))
  .finally(() => pgp.end());
