const { connectToClient, closeClient, getDB } = require("./mongoUtils");

// self-defined query
// find the average base salary of each job title and sort in decreasing order

async function query5() {
  // Connect to the MongoDB server
  const client = connectToClient();
  try {
    const db = getDB(client);
    const aggregation = [
      {
        $group: {
          _id: "$title",
          avg_base_salary: { $avg: "$salary.base_salary" },
        },
      },
      {
        $project: {
          _id: 0,
          job_title: "$_id",
          avg_base_salary: 1,
        },
      },
      {
        $sort: {
          avg_base_salary: -1,
        },
      },
    ];
    const average_base = await db
      .collection("positions")
      .aggregate(aggregation)
      .toArray();
    console.log("Average base salary of each job:", average_base);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    closeClient(client);
  }
}

query5();
