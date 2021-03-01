const search = require("./search");
const update = require("./update");
const del = require("./del");
const create = require("./create");
console.log(create, 11);
//  引入
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "exDemo";

function connect(action, collectionName, params, callback) {
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console.log("数据库连接失败", err);
    }
    var db = client.db(dbName);
    switch (action) {
      case "search":
        search
          .searchData(db, collectionName, params.target)
          .then(function (data) {
            callback && callback(data, db);
            console.log(data);
          });
        break;

      case "update":
        update
          .updateData(db, collectionName, params.id, params.newData)
          .then(function (data) {
            callback && callback(data, db);
          });
        break;
      case "del":
        del.delData(db, collectionName, params.id).then(function (data) {
          callback && callback(data, db);
        });
        break;
      case "create":
        create.createData(db, collectionName, params).then(function (data) {
          callback && callback(data, db);
        });
        break;
    }
    client.close();
  });
}

module.exports = {
  connect,
};
