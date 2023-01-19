const fastify = require("fastify")({
  logger: true,
});

const connectDB = require("./configs/db");
const cros = require("@fastify/cors");
const fileUpload = require("fastify-file-upload");

require("dotenv").config();
fastify.register(cros);
// fastify.register(require("@fastify/multipart"));

fastify.register(fileUpload);

//connect mongodb
connectDB();

const userSchema = require("./schema/userSchema");

const { S3 } = require("aws-sdk");

const { awsupload } = require("./helpers/aws");

fastify.get("/", (request, response) => {
  response.send("welcome");
});

fastify.route({
  method: "POST",
  url: "/register",
  handler: async function (req, res) {
    console.log("mkmkm");
    const data = await req.raw.files;
    const fieldlogData = req.raw.body;
    console.log(
      data.file,
      "++++++++++++++++++++++++++",
      fieldlogData.userEmail,
      fieldlogData.userName
    );
    try {
      //aws upload func
      const ImageUrl = await awsupload(data.file);

      try {
        let res1 = await fetch("http://localhost:500/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            userEmail: fieldlogData.userEmail,
            userName: fieldlogData.userName,
            useImage: ImageUrl,
          }),
        });
        // console.log(res1,"/////////////")
        if (res1.status) {
          return res
            .code(200)
            .send({ message: "User added successfully", statusCode: 200 });
        } else {
          return res
            .code(500)
            .send({ message: "Something went wrong1", statusCode: 500 });
        }
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err, "00000");
      return res
        .code(500)
        .send({ message: "Something went wrong2", statusCode: 500 });
    }
  },
  // contenType: "multipart/form-data",
});

fastify.post("/upload", async (req, res) => {
  const { userEmail, userName, useImage } = req.body;
  // console.log(req.body.userEmail, "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
  try {
    const data = await userSchema.create({ userEmail, userName, useImage });

    if (data) {
      return { message: "User added successfully", statusCode: true };
    } else {
      return { message: "Something went wrong3", statusCode: true };
    }
  } catch (err) {
    console.log(err.response.data);
    return { message: "Something went wrong4", statusCode: false };
  }
});

fastify.get("/register", async (req, res) => {
  try {
    const data = await userSchema.find();
    fastify.log.error(
      "Some info about the current reques" + data + " " + new Date()
    );
    if (data) {
      res
        .code(200)
        .send({ message: "User added successfully", statusCode: 200, data });
    } else {
      res.code(500).send({ message: "Something went wrong", statusCode: 500 });
    }
    //  response.send("data from register")
  } catch (err) {
    res.code(500).send({ message: "Something went wrong", statusCode: 500 });
  }
});

fastify.listen(5000, () => {
  console.log("connected");
});
