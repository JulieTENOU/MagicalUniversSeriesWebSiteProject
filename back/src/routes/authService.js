const express = require("express");
const router = express.Router();
const { authService } = require("../controllers");
const { user } = require("../controllers");
const {verifyToken} = require("../middleware"); 

router.post("/register", authService.create);
router.post("/signIn", authService.signIn);
router.post("/logout", authService.logout);
router.post("/verifyEmail", authService.verifyEmail);
router.put("/updatePwd/:users_ID", authService.updatePassword);
router.post('/forgot-password', authService.forgotPassword);
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