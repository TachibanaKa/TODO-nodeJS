const search = require("./search");
const update = require("./update");
const del = require("./del");
const create = require("./create");
const counter = require("./counter")
//  引入
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "exDemo";

/* 连接数据库做增删改查操作 */
function connect(action, collectionName, params, callback) {
  MongoClient.connect(url, { useUnifiedTopology: true } ,function (err, client) {
    if (err) {
      console.log("数据库连接失败", err);
    }
    var db = client.db(dbName);
    switch (action) {
      case "search":
        search
          .searchData(db, collectionName, params.target,(data)=>{
            callback && callback(data, db);
          })
        break;

      case "update":
        update.updateData(db, collectionName, params.id, params.newData, (data)=>{
            callback && callback(data, db);
          })
        break;
      case "del":
        del.delData(db, collectionName, params,(data)=>{
          callback && callback(data, db);
        })
        break;
      case "create":
        create.createData(db, collectionName, params,(data)=>{
          callback && callback(data, db);
        })
        break;
    }
    //client.close();
  });
}

/* id自增 */
function getId(sequenceName,callback){
  MongoClient.connect(url, { useUnifiedTopology: true } ,function (err, client) {
    if (err) {
      console.log("数据库连接失败", err);
    }
    var db = client.db(dbName);
    let selfId = counter.getNextSequenceValue(sequenceName,db,callback)
    return selfId
  });
}

module.exports = {
  connect,
  getId
};
