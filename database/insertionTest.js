const Promise = require('bluebird');
const db = require('./index.js');

let data = {
  "id": 1,
  "unavailable_dates": ["3/27/2018","3/7/2018","5/26/2018","3/3/2018","4/10/2018","4/23/2018","4/16/2018","4/22/2018","3/31/2018","4/2/2018","2/25/2018","5/10/2018","5/24/2018","4/8/2018","5/18/2018","3/21/2018","4/9/2018","2/25/2018","5/21/2018","5/3/2018","5/23/2018","3/13/2018","3/16/2018","4/17/2018","5/25/2018","4/9/2018","5/19/2018","4/30/2018","3/13/2018","4/1/2018","5/14/2018","4/8/2018","3/12/2018"],
  "rating":3,
  "rating_amount":81,
  "guest_max":4,
  "cost":187,
  "min_stay":3,
  "max_stay":25,
  "children_allowed":false,
}

function modifyAndSaveData(data, id) {
  data.id = id;
  return db.save(data)
    .catch(e => console.log('error', e));
}

function insertFiveK(index) {
  let array = Array.from({length: 5000}, (x , i)=> i+1);
  const promises = array.map(item => modifyAndSaveData(data, item + index));
  return Promise.all(promises)
    .then(() => console.log('added ' + (index + 5000) + ' record'));
}

async function insertFiveKnTimes(n) {
  let array = Array.from({length: n}, (x , i)=> i);
  // const promises = array.map(item => insertFiveK(item * 5000));
  for(const item of array) {
    await insertTenK(item * 5000);
  }

  console.log('done');
}

insertFiveKnTimes(10);
