const mongodbConnectThenAggregate = async (
  dataAddress = {
    connectionString: "mongodb://127.0.0.1:27017/",
    databaseName: "database-test",
    collectionName: "collection-test",
  },
  aggregation = [{ $match: {} }]
) => {
  const { connectionString, databaseName, collectionName } = dataAddress;
  try {
    const { MongoClient } = require("mongodb");
    const client = await MongoClient.connect(connectionString);
    const collection = client.db(databaseName).collection(collectionName);
    const result = await collection.aggregate(aggregation).toArray();
    await client.close();
    return result;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = mongodbConnectThenAggregate;

// const dataAddress = {
//   connectionString: "mongodb://127.0.0.1:27017/",
//   databaseName: "caplink",
//   collectionName: "map",
// };

// // เรียกใช้งาน mongodbConnectThenAggregate ในรูปแบบ async เนื่องจากมีการใช้ await ในฟังก์ชัน
// mongodbConnectThenAggregate(dataAddress)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
