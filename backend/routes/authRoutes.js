const express = require("express");
const {
  signUp,
  signIn,
  logoutUser,
  verifyAuth,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/logout", logoutUser);

router.get("/verifyauth", verifyAuth);

module.exports = router;
