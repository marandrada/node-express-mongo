var express = require("express");
const loanController = require("../controllers/loan");
const router = express.Router();


router.get("/", loanController.findAll);
router.get("/pending", loanController.pendingLoan);
router.get("/paid", loanController.paidLoan);
router.post("/:id/registerPayment", loanController.registerPayment);
router.get("/:id", loanController.findOne);
router.post("/", loanController.create);
router.put("/:id", loanController.updateOne);
router.delete("/:id", loanController.deleteOne);

module.exports = router;