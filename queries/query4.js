const { connectToClient, closeClient, getDB } = require("./mongoUtils");

//updating a document based on a query parameter
//increase a base_salary by $10(I dont want change too drasticly)  if lower than 100,000.

async function query4() {
  // Connect to the MongoDB server
  const client = connectToClient();
  try {
    const db = getDB(client);

    const filter = { "salary.base_salary": { $lt: 100000 } };

    const updateOperation = {
      $inc: {
        "salary.base_salary": 10,
      },
    };

    const beforeChange = await db.collection("positions").findOne(filter);
    console.log("Before change: ", beforeChange);
    await db.collection("positions").updateMany(filter, updateOperation);
    const afterChange = await db
      .collection("positions")
      .findOne({ position_id: beforeChange.position_id });
    console.log("After change: ", afterChange);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    closeClient(client);
  }
}

query4();
