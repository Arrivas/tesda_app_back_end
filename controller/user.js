const router = require("express").Router();
const User = require("../models/userModel");

// get all user
router.get("/get/all", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get one user
router.get("/get/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update user
router.put("/update/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id);
    res.json({ message: "user updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete user
router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "user deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
