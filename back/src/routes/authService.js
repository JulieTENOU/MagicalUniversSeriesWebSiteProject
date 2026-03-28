const express = require("express");
const router = express.Router();
const { authService } = require("../controllers");
const { user } = require("../controllers");
const {verifyToken} = require("../middleware");
const authRateLimit = require("../../utils/authRateLimit.js");

router.post("/register", authService.create);
router.post("/signIn", authRateLimit, authService.signIn);
router.post("/logout", authService.logout);
router.put("/updatePwd", verifyToken, authService.updatePassword);
router.post('/forgot-password', authRateLimit, authService.forgotPassword);
router.post('/reset-password/:token', authService.resetPassword);


router.get("/me", verifyToken, async (req, res) => {
  try {
    const foundUser = await user.findOneById(req.userId);
    if (!foundUser) return res.status(404).send({ message: "User not found" });

    res.status(200).send(foundUser);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});


module.exports = router;