const Promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: Promise,
});
const { createPostgresProduct, createUnavailableDate } = require('./createData');
const db = require('./postgresSchema');

// populate database with three months
function populateDates() {
  const promises = [];
  const today = new Date(Date.now());
  for (let i = 0; i < 90; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    promises.push(db.insertDate(date));
  }
  return Promise.all(promises)
    .then(() => console.log('populated three months'));
}

// batch insert function for 500 data
function batchInsert(index) {
  const products = [];
  const insertionCount = 1000;
  const dates = [];

  for (let i = 0; i < insertionCount; i += 1) {
    products.push(createPostgresProduct(i + index));

    const dateCount = Math.floor(Math.random() * 20) + 10;
    for (let j = 0; j < dateCount; j += 1) {
      dates.push(createUnavailableDate(i + index));
    }
  }

  return db.insertManyProducts(products)
    .then(() => db.insertManyUnavailDates(dates))
    .then(() => console.log(`inserted ${insertionCount + index} data entries`));
}

// the finale
async function batchInsertNTimes(n) {
  for (let i = 0; i < n; i += 1) {
    await batchInsert(i * 1000);
  }
  console.log('batch insert complete');
}

db.init()
  .then(() => populateDates())
  .then(() => batchInsertNTimes(10000))
  .catch(e => console.log('error: ', e));
