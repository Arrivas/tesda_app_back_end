const router = require("express").Router();
const Borrow = require("../models/borrowModel");

router.get("/get/all", async (req, res) => {
  try {
    const borrowAll = await Borrow.find({});
    res.json(borrowAll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/new", async (req, res) => {
  const newBorrow = new Borrow(req.body);
  try {
    await newBorrow.save();
    res.status(200).json(newBorrow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update", async (req, res) => {
  const borrow = await Borrow.findByIdAndUpdate(req.params.id);
  try {
    return res.json({ message: "updated", borrow });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/deleted/:id", async (req, res) => {
  try {
    await Borrow.findByIdAndDelete(req.params.id);
    res.json({ message: "borrow deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
