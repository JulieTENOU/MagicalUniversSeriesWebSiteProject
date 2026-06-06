const express = require('express');
const router = express.Router();
const { user } = require("../controllers");
const { verifyToken } = require("../middleware/index");

router.post("/createUser", user.create);
router.get("/findAllUser", verifyToken, user.findAll);
///:users_ID
module.exports = router;