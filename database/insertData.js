const Promise = require('bluebird');
const { createData } = require('./createData');
const db = require('./index');

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

function batchInsert(index) {
  const insertionCount = 250000;
  let dataArray = [];
  for(var i = 1; i <= insertionCount; i++) {
    let entry = createData(i + index);
    dataArray.push(entry);
  }
  return db.saveMany(dataArray)
    .then(() => console.log(`inserted ${insertionCount + index} data entries`));
}

async function batchInsertNTimes(n) {
  for(var i = 0; i < n; i++){
    await batchInsert(i * 250000);
  }
  console.log('done');
}

batchInsertNTimes(1);
