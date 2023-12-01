const { connectToClient, closeClient, getDB } = require("../../mongoUtils");

async function getUsers() {
  const client = connectToClient();
  try {
    const db = getDB(client);
    //Display 10 users
    const users = await db
      .collection("users")
      .find({})
      .sort({ _id: -1 })
      .limit(10)
      .toArray();
    return users;
  } catch (err) {
    console.error("Error:", err);
  } finally {
    closeClient(client);
  }
}

async function getUser(user_id) {
  const client = connectToClient();
  try {
    const db = getDB(client);
    //get user by id
    const user = await db.collection("users").findOne({ user_id: +user_id });
    return user;
  } catch (err) {
    console.error("Error:", err);
  } finally {
    closeClient(client);
  }
}

async function updateUser(user_id, user) {
  const client = connectToClient();
  try {
    const db = getDB(client);
    const update = {
      $set: {
        name: user.name,
        job_interest: user.job_interest,
        school: user.school,
      },
    };
    //update user by id
    const result = await db
      .collection("users")
      .updateOne({ user_id: +user_id }, update);
    return result;
  } catch (err) {
    console.error("Error:", err);
  } finally {
    closeClient(client);
  }
}

async function deleteUser(user_id) {
  const client = connectToClient();
  try {
    const db = getDB(client);
    //get user by id
    const result = await db
      .collection("users")
      .deleteOne({ user_id: +user_id });
    return result;
  } catch (err) {
    console.error("Error:", err);
  } finally {
    closeClient(client);
  }
}

async function addUser(user) {
  const newUser = {
    user_id: +user.id,
    name: user.name,
    job_interest: user.job_interest,
    school: user.school,
  };
  const client = connectToClient();
  try {
    const db = getDB(client);
    const result = await db.collection("users").insertOne(newUser);
    return result;
  } catch (err) {
    console.error("Error:", err);
  } finally {
    closeClient(client);
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser,
};
