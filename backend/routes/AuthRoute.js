const { Signup, Login } = require("../controllers/AuthController");
const router = require("express").Router();
const { userVerification } = require("../middlewares/AuthMiddleware");

router.get("/auth", userVerification);
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully", success: true });
});

module.exports = router;