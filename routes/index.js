var express = require('express');
var router = express.Router();
const { validateToken } = require("../middlewares/utils");


const { 

  addEntry,
  updateEntry, 
  removeEntry,
  updatePrivacy,
  getPublicEntries,

} = require("../controllers/entryController");

router.post("/add_entry", addEntry);

router.post("/update_entry", updateEntry);

router.post("/remove_entry", removeEntry);

router.post("/update_privacy", updatePrivacy);

router.get("/pub_entries/:userId", getPublicEntries);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Salut');
});


module.exports = router;