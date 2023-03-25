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
  try {
    const newBorrow = await Borrow.create(req.body);
    res.json(newBorrow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // Borrow.find({ propertyNo: newBorrow.propertyNo })
  //   .exec()
  //   .then(async (data) => {
  //     if (data.length > 0)
  //       return res.status(400).json({
  //         message: `property no. ${newBorrow.propertyNo} already exists in the database`,
  //       });
  //     await newBorrow.save();
  //     return res.status(200).json(newBorrow);
  //   })
  //   .catch((error) => res.status(500).json({ message: error.message }));
});

router.put("/update", async (req, res) => {
  const borrow = await Borrow.findByIdAndUpdate(req.params.id);
  try {
    return res.json({ message: "updated", borrow });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Borrow.findByIdAndDelete(req.params.id);
    res.json({ message: "borrow deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/delete/multiple", async (req, res) => {
  try {
    await Borrow.deleteMany({
      _id: { $in: req.body.toDelete },
    });
    res.json({ message: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
