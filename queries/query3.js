const { connectToClient, closeClient, getDB } = require("./mongoUtils");

//counting documents for an specific user
//count the applications the user have submitted (try use 9350 for user_id, most random id may not have applications, and some are 1)

async function query3() {
  // Connect to the MongoDB server
  const client = connectToClient();
  try {
    const db = getDB(client);
    const user_id = 9350;
    const query = {
      "candidate.user_id": user_id,
    };
    const applications = await db
      .collection("applications")
      .countDocuments(query);
    console.log(`The user ${user_id} application count:`, applications);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    closeClient(client);
  }
}

query3();
