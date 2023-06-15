const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      maxlength: 25,
      minlength: 4,
    },
    email: { type: String, unique: true, maxlength: 100, minlength: 10 },
    password: { type: String, maxlength: 200, minlength: 8, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
