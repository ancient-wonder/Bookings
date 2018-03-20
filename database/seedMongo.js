const { createData } = require('./createData');
const db = require('./mongoSchema');

function batchInsert(index) {
  const insertionCount = 100000;
  const dataArray = [];
  for (let i = 1; i <= insertionCount; i++) {
    const entry = createData(i + index);
    dataArray.push(entry);
  }
  return db.saveMany(dataArray)
    .then(() => console.log(`inserted ${insertionCount + index} data entries`));
}

async function batchInsertNTimes(n) {
  for (let i = 0; i < n; i++) {
    await batchInsert(i * 100000);
  }
  console.log('done');
}

// batchInsertNTimes(100);
for (var i = 0; i < 4; i++) {
  console.log(createData(i));
}
