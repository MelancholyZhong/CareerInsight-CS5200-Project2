let express = require("express");
let router = express.Router();

const { getPositions } = require("../db/controller/position_controller");

/* GET home page. */
router.get("/", async function (req, res) {
  const positions = await getPositions();
  res.render("index", { title: "All postions (10 of them)", positions });
});

module.exports = router;
