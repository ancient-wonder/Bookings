const faker = require('faker');

function createData(id) {
  const data = {};
  data.id = id;
  data.unavailable_dates = new Array(faker.random.number({ min: 10, max: 30 }));
  for (let i = 0; i < data.unavailable_dates.length; i++) {
    let date = faker.date.between('2018-3-16', '2018-6-30');
    data.unavailable_dates[i] = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
  data.rating = faker.random.number({ min: 1, max: 5 });
  data.rating_count = faker.random.number(2000);
  data.guest_max = faker.random.number({ min: 1, max: 8 });
  data.cost = faker.random.number({ min: 150, max: 500 });
  data.min_stay = faker.random.number({ min: 1, max: 3 });
  data.max_stay = faker.random.number({ min: 10, max: 28 });
  data.children_allowed = faker.random.boolean();

  return data;
}

module.exports = { createData };
