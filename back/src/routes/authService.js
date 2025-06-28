const express = require("express");
const router = express.Router();
const { authService } = require("../controllers");

router.post("/register", authService.create);
router.post("/signIn", authService.signIn);
router.post("/api/verifyEmail", authService.verifyEmail);
router.put("/api/updatePwd/:users_ID", authService.updatePassword);

module.exports = router;