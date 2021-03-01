/* 
添加单条数据
*/
async function createData(db, collectionName, params) {
  var result = "";
  await db
    .collection(collectionName)
    .insertOne(params)
    .then(
      function (data) {
        result = `添加成功`;
      },
      function (err) {
        result = `createData函数失败${err}`;

        return result;
      }
    );
  return result;
}
module.exports = {
  createData,
};
