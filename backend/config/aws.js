const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const uploadToS3 = async (file, folder) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${folder}/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    throw new Error(`S3 Upload Error: ${error.message}`);
  }
};

module.exports = { s3, uploadToS3 };
