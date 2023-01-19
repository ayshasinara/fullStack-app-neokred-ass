const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://ayshasinara:ayshasinara@cluster0.b26xeg5.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      dbName: "blog",
      user: "ayshasinara",
      pass: "ayshasinara",
      autoCreate: true,
    }
  );
  console.log("mongoDB connected");
};
module.exports = connectDB;


