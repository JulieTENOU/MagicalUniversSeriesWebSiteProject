const express = require('express');
const router = express.Router();
const { user } = require("../controllers");
const  verifyToken  = require("../middleware/index");

router.post("/createUser", user.create);
router.get("/api/getOne", user.findOne);
router.get("/findAllUser", user.findAll);
router.put("/api/updateUser/:users_ID", user.update);
///:users_ID
module.exports = router;