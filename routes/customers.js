var express = require("express");
var router = express.Router();

const customersCtrl = require("../controllers/customers");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/", ensureLoggedIn, customersCtrl.index);

router.get("/add", ensureLoggedIn, customersCtrl.new);

router.post("/", ensureLoggedIn, customersCtrl.create);

router.delete("/:id", ensureLoggedIn, customersCtrl.delete);

router.get("/:id/edit", ensureLoggedIn, customersCtrl.edit);

router.put("/:id", ensureLoggedIn, customersCtrl.update);

module.exports = router;
