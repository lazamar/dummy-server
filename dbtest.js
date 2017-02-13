let MongoClient = require("mongodb").MongoClient,
    assert = require("assert");

// Connection URL
const url = "mongodb://centrus:dockCentrusDB2017@ds151049.mlab.com:51049/centrus-db";
// Use connect method to connect to the Server
MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    db.close();
});
