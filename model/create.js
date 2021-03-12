/* 
添加单条数据
*/
var res = {
  code: 200,
  data: null,
};
async function createData(db, collectionName, params,callback) {
  await db
    .collection(collectionName)
    .insertOne(params)
    .then(
      function (data) {
        res.data = `添加成功`;
      },
      function (err) {
        res.code = 500
        res.data = `createData函数失败${err}`;
        res.msg = "createData函数出错"
        return res;
      }
    );
  callback(res)
  return res;
}
module.exports = {
  createData,
};
