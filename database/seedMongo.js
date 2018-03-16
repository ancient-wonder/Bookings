const { createData } = require('./createData');
const db = require('./index');

function batchInsert(index) {
  const insertionCount = 250000;
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
    await batchInsert(i * 250000);
  }
  console.log('done');
}

batchInsertNTimes(1);
