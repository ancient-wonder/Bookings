const { createMongoData } = require('./createData');
const db = require('./mongoSchema');

function batchInsert(index) {
  const insertionCount = 50000;
  const dataArray = [];
  for (let i = 1; i <= insertionCount; i++) {
    const entry = createMongoData(i + index);
    dataArray.push(entry);
  }
  return db.saveMany(dataArray)
    .then(() => console.log(`inserted ${insertionCount + index} data entries`));
}

async function batchInsertNTimes(n) {
  for (let i = 0; i < n; i++) {
    await batchInsert(i * 50000);
  }
  console.log('done');
}

batchInsertNTimes(50);
