const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Auth = require("../models/authModel");
const bcrypt = require("bcrypt");

// create token
const createToken = (id) => jwt.sign({ id }, "super secret hehe", {});

// new user
router.post("/create", async (req, res) => {
  await User.findOne({ username: req.body.username }).then(async (doc) => {
    if (!doc) {
      // hash password
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const user = await User.create(req.body);
      // add the token
      const token = createToken(user._id);
      return res.json({ message: "user created", user, token });
    }
    res.status(500).json({ message: "username already exists" });
  });
});

// log user in
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id);
        // message: "Logged in", user,
        return res.status(200).json({ token });
      }
      res.status(400).json({ message: "invalid credentials" });
    } else {
      res.status(404).json({ message: "user does not exists" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
