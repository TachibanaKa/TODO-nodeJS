let res = {
  code: 200,
  data: null,
};
async function getNextSequenceValue(sequenceName, db, callback) {
  let id = null
  await db
    .collection("counters")
    .find({'_id':sequenceName})
    .toArray()
    .then(
      function (data) {
        id = data[0].sequence_value+1
      },
      function (err) {
        res.code = 500;
        res.data = `getNextSequenceValue函数失败${err}`;
      }
    );
  await db
    .collection("counters")
    .updateOne(
      { _id: sequenceName },
      { $set: { _id: sequenceName, sequence_value: id } },
      { new: true },
      function (err,data) {
        if (err) {
          res = {
            code: 500,
            data: "更新失败",
            msg: "updateData函数出错",
          };
          return res;
        }
        res.data = "修改成功";
        callback(id)
        return res;
      }
    );
}
module.exports = {
  getNextSequenceValue,
};
