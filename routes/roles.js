var express = require("express");
var router = express.Router();

const rolesCtrl = require("../controllers/roles");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/", ensureLoggedIn, rolesCtrl.index);

router.post("/", ensureLoggedIn, rolesCtrl.create);

module.exports = router;
