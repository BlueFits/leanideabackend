var express = require('express');
var router = express.Router();

const { getAllEntries } = require("../controllers/entryController");

const { addUser, login, getUser } = require("../controllers/userController");
const { validateToken } = require("../middlewares/utils");

router.post("/add", addUser);

router.post("/login", login);

router.get("/get_user", validateToken, getUser);

router.get("/entries/:userId", validateToken, getAllEntries);

module.exports = router;