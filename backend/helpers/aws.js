const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

module.exports.awsupload = async (data) => {
  // console.log(
  //   data.filename,
  //   "ayshasinara123-----------------------------------",
  //   process.env.AWS_S3_BUCKET_NAME
  // );

  try {
    const UploadImage = await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `IMG/${data.name}`,
        Body: data.data,
      })
      .promise();
    // console.log(UploadImage.Location,"]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]")
    return UploadImage.Location;
    //   console.log(UploadImage,"==========================================")
  } catch (err) {
    console.log(err, "----------------------------------aaaa");
    return false;
  }
};
