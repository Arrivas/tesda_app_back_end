const router = require("express").Router();
const Borrow = require("../models/borrowModel");
const Image = require("../models/imageModel");
const Inventory = require("../models/inventoryModel");

router.get("/get/all", async (req, res) => {
  try {
    const borrowAll = await Borrow.find({});
    res.json(borrowAll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get/one/:id", async (req, res) => {
  Borrow.findById(req.params.id)
    .exec()
    .then(async (data) => {
      return res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
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

router.put("/update/:id", async (req, res) => {
  const borrow = await Borrow.findByIdAndUpdate(req.params.id, req.body);
  try {
    return res.json({ message: "updated", borrow });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Borrow.findByIdAndDelete(req.params.id);
    res.json({ message: "item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/delete/multiple", async (req, res) => {
  try {
    await Borrow.deleteMany({
      _id: { $in: req.body.toDelete },
    });
    await Image.deleteMany({
      _id: { $in: req.body.toDeleteImg },
    });
    res.json({ message: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/get/stats", async (req, res) => {
  try {
    const borrowAll = await Borrow.find({});
    const year = req.body.year;
    const filteredObjectsByMonth = [];

    for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
      const monthName = new Date(`${monthNumber} 1, ${year}`).toLocaleString(
        "default",
        { month: "long" }
      );
      const filteredObjects = borrowAll.filter((obj) => {
        const createdAt = new Date(obj.createdAt);
        return (
          createdAt.getMonth() + 1 === monthNumber &&
          createdAt.getFullYear() === year
        );
      });

      const returnsCount = filteredObjects.filter(
        (obj) => obj.isBorrowed === false
      ).length;

      filteredObjectsByMonth.push({
        month: monthName,
        objects: filteredObjects.map((obj) => ({
          _id: obj._id,
          propertyNo: obj.propertyNo,
          equipment: obj.equipment,
          return: obj.isBorrowed ? "borrowed" : "returned",
          location: obj.location,
          purpose: obj.purpose,
          borrowerName: obj.fullName,
          condition: obj.condition,
        })),
        borrows: filteredObjects.length,

        returns: returnsCount,
      });
    }
    res.json(filteredObjectsByMonth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get/reminder", async (req, res) => {
  try {
    const borrowAll = await Borrow.find({});
    const pastDues = [];
    borrowAll.forEach((item) => {
      if (item.isBorrowed && new Date() > new Date(item.dateReturn))
        pastDues.push({
          _id: item._id,
          propertyNo: item.propertyNo,
          borrowerName: item.fullName,
          equipment: item.equipment,
          role: item.role,
          qty: item.qty,
          purpose: item.purpose,
          dateReturn: item.dateReturn,
          condition: item.condition,
        });
    });
    res.status(200).json(pastDues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get/search", async (req, res) => {
  try {
    const inventoryAll = await Inventory.find({});
    const filteredInventory = inventoryAll.filter((item) => {
      if (
        item.equipment.toLowerCase().includes(req.query.q.toLowerCase()) &&
        item.condition === "Serviceable"
      )
        return item;
    });

    res.json(filteredInventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.get("/get/search", async (req, res) => {
//   try {
//     const inventoryAll = await Inventory.find({});
//     const filteredInventory = inventoryAll.filter((item) => {
//       if (
//         item.propertyNo.toLowerCase().includes(req.query.q.toLowerCase()) &&
//         item.condition === "Serviceable"
//       )
//         return item;
//     });

//     res.json(filteredInventory);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.put("/returned/:id", async (req, res) => {
  await Borrow.findById(req.params.id)
    .exec()
    .then(async (data) => {
      const currentBorrow = data;
      currentBorrow.isBorrowed = false;
      if (req.body.activemode) currentBorrow.condition = req.body.activemode;
      await Borrow.findByIdAndUpdate(req.params.id, currentBorrow);
      return res.status(200).json(currentBorrow);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
