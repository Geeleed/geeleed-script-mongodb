import { MongoClient, Collection, AggregationCursor } from "mongodb";

interface DataAddress {
  connectionString: string;
  databaseName: string;
  collectionName: string;
}

const mongodbConnectThenAggregate = async (
  dataAddress: DataAddress = {
    connectionString: "mongodb://127.0.0.1:27017/",
    databaseName: "database-test",
    collectionName: "collection-test",
  },
  aggregation: object[] = [{ $match: {} }]
): Promise<any[]> => {
  const { connectionString, databaseName, collectionName } = dataAddress;
  try {
    const client = await MongoClient.connect(connectionString);
    const collection: Collection = client
      .db(databaseName)
      .collection(collectionName);
    const result: any[] = await (
      collection.aggregate(aggregation) as AggregationCursor<any>
    ).toArray();
    await client.close();
    return result;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export = mongodbConnectThenAggregate;
