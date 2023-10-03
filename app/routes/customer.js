var express = require("express");
const customerController = require("../controllers/customer");
const router = express.Router();


router.get("/", customerController.findAll);
router.get("/:id", customerController.findOne);
router.post("/", customerController.create);
router.put("/:id", customerController.updateOne);
router.delete("/:id", customerController.deleteOne);

module.exports = router;