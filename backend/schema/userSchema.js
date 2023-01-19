const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: {
    type: String,
    unique: true,
    required: true,
  },
  useImage: {
    type: String,
    require: true,
    unique: true,
  },
});
module.exports = mongoose.model("user", userSchema);
