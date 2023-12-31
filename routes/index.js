let express = require("express");
let router = express.Router();

const { getPositions } = require("../db/controller/position_controller");

//home page displays all the positions
router.get("/", async function (req, res) {
  const positions = await getPositions();
  res.render("index", { title: "All postions (10 of them)", positions });
});

module.exports = router;
