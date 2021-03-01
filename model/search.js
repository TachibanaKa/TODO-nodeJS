/* 
查找某一个集合的所有数据或单条数据
*/
async function searchData(db, collectionName, target) {
  var res = {
    code: 200,
    data: null,
  };
  await db
    .collection(collectionName)
    .find(target)
    .toArray()
    .then(
      function (data) {
        let dataArr = [];
        data.forEach(function (value, index, arr) {
          dataArr.push(value);
        });
        res.data = dataArr;
      },
      function (err) {
        res.code = 500;
        res.data = `searchData函数失败${err}`;
      }
    );
  return res;
}

module.exports = {
  searchData,
};
