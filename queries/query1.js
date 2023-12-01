const { connectToClient, closeClient, getDB } = require("../mongoUtils");

//Contains an aggregation: top 10 applied companies

async function query1() {
  // Connect to the MongoDB server
  const client = connectToClient();
  try {
    const db = getDB(client);
    //Find the top 10 applied companies
    const aggregation = [
      {
        $group: {
          _id: "$position.company",
          applications: { $count: {} },
        },
      },
      {
        $project: {
          _id: 0,
          company: "$_id",
          applications: 1,
        },
      },
      {
        $sort: {
          applications: -1,
        },
      },
    ];
    const count = await db
      .collection("applications")
      .aggregate(aggregation)
      .limit(10)
      .toArray();
    console.log("Top 10 applied companies:", count);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    closeClient(client);
  }
}

query1();
