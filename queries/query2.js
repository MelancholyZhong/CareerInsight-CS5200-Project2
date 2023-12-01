const { connectToClient, closeClient, getDB } = require("../mongoUtils");

//contain a complex search criterion (more than one expression with logical connectors)
//find good jobs: the base salary is more than 150k, and the bonus is more than 25% of base salary or the equity is more than 50% of base salary

async function query2() {
  // Connect to the MongoDB server
  const client = connectToClient();
  try {
    const db = getDB(client);
    const aggregation = [
      {
        $match: {
          $expr: {
            $gt: ["$salary.base_salary", 150000], // Match documents where base salary > 150k
          },
        },
      },
      {
        $match: {
          $or: [
            {
              $expr: {
                $gt: [
                  "$salay.bonus",
                  { $multiply: ["$salary.base_salary", 0.25] },
                ],
              },
            }, // Bonus > 25% of base salary
            {
              $expr: {
                $gt: [
                  "$salary.equity",
                  { $multiply: ["$salary.base_salary", 0.5] },
                ],
              },
            }, // Equity > 50% of base salary
          ],
        },
      },
    ];
    const good_jobs = await db
      .collection("positions")
      .aggregate(aggregation)
      .toArray();
    console.log("Good jobs:", good_jobs);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    closeClient(client);
  }
}

query2();
