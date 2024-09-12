const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "ckr-private-bucket",
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function putObjectURL(type) {
  const command = new PutObjectCommand({
    Bucket: "ckr-private-bucket",
    Key: `uploads/images/image-${Date.now()}`,
    ContentType: type,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function getlistObjects() {
  const command = new ListObjectsCommand({
    Bucket: "ckr-private-bucket",
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function init() {
  // console.log("URL", await getObjectURL("uploads/images/image-1723562107297"));
  // console.log("URL", await putObjectURL("image/jpg"));
  console.log("List - ", await getlistObjects());
}

init();
