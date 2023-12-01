let express = require("express");
let router = express.Router();

const {
  getPosition,
  updatePosition,
  deletePosition,
  addPosition,
} = require("../db/controller/position_controller");

router.get("/:position_id/edit", async function (req, res) {
  const position_id = req.params.position_id;
  const position = await getPosition(position_id);
  res.render("positionForm", { title: "Position details", position });
});

router.post("/:position_id/edit", async function (req, res) {
  const position_id = req.params.position_id;
  const position = req.body;
  const result = await updatePosition(position_id, position);
  res.redirect("/");
});

router.get("/:position_id/delete", async function (req, res) {
  const position_id = req.params.position_id;
  const result = await deletePosition(position_id);
  res.redirect("/");
});

router.get("/add", async function (req, res) {
  res.render("positionForm", { title: "Add a position", position: null });
});

router.post("/add", async function (req, res) {
  const position = req.body;
  const result = await addPosition(position);
  res.redirect("/");
});

module.exports = router;
