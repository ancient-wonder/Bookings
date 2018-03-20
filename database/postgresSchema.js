const Promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: Promise,
});

// create connection
const cn = {
  user: 'hanyuzhu',
  host: 'localhost',
  database: 'bookings',
  password: 'password',
  port: 5432,
};
const client = pgp(cn);

function init() {
  // create tables if not exist
  const createProductTable = 'CREATE TABLE IF NOT EXISTS product '
  + '(id INTEGER PRIMARY KEY, '
  + 'rating INTEGER, '
  + 'rating_count INTEGER, '
  + 'guest_max INTEGER, '
  + 'cost INTEGER, '
  + 'min_stay INTEGER, '
  + 'max_stay INTEGER, '
  + 'children_allowed BOOLEAN'
  + ')';

  const createDateTable = 'CREATE TABLE IF NOT EXISTS date '
  + '(id SERIAL PRIMARY KEY, '
  + 'date DATE NOT NULL DEFAULT CURRENT_DATE UNIQUE'
  + ')';

  const createJunctTable = 'CREATE TABLE IF NOT EXISTS unavailable_date '
  + '(product_id INT REFERENCES product (id) ON UPDATE CASCADE ON DELETE CASCADE, '
  + 'date_id INT REFERENCES date (id) ON UPDATE CASCADE ON DELETE CASCADE'
  + ')';

  return client.none(createProductTable)
    .then(() => client.none(createDateTable))
    .then(() => client.none(createJunctTable))
    .then(() => console.log('tables created!'));
}

function insertDate(date) {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return client.none('INSERT INTO date (date) VALUES($1)', [dateString])
    .then(() => console.log('date inserted'));
}

function insertManyProducts(data) {
  const cs = new pgp.helpers.ColumnSet(
    ['id', 'rating', 'rating_count', 'guest_max', 'cost', 'min_stay', 'max_stay', 'children_allowed'],
    { table: 'product' },
  );
  const query = pgp.helpers.insert(data, cs);
  return client.none(query);
}

function insertManyUnavailDates(data) {
  const cs = new pgp.helpers.ColumnSet(
    ['product_id', 'date_id'],
    { table: 'unavailable_date' },
  );
  const query = pgp.helpers.insert(data, cs);
  return client.none(query);
}

module.exports = {
  init,
  insertDate,
  insertManyProducts,
  insertManyUnavailDates,
};
