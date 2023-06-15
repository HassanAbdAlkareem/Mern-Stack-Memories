const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { email, password, confirmPassword, username } = req.body;

  try {
    const verfiyEmailUser = await User.findOne({ email: email });
    if (verfiyEmailUser)
      return res.status(400).json({
        message: "this email already signup or taken by another user",
      });

    const verfiyUsername = await User.findOne({ name: username });
    if (verfiyUsername)
      return res.status(400).json({
        message: "This username is already signup or taken by another user",
      });

    if (password !== confirmPassword)
      return res.status(401).json({ message: "password don't match" });

    const hashPassword = await bcrypt.hash(password, 10);
    const data = await new User({
      email,
      password: hashPassword,
      name: username,
    });

    const token = jwt.sign(
      { email: data.email, id: data._id },
      process.env.PRIVATE_TOKEN
    );
    data.save();
    res.status(200).json({ data, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .send("your email is wrong or you are not register");

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword)
      return res
        .status(404)
        .send("your password is wrong or you are not register ");

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.PRIVATE_TOKEN
    );

    res.status(200).json({ data: user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
