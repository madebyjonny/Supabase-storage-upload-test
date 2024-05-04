import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

const config = {
  forcePathStyle: true,
  endpoint: process.env.S3_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_ID as string,
    secretAccessKey: process.env.S3_SECRET_ID as string,
  },
  region: process.env.S3_REGION as string, // Specify the region where your Space is located
};

const s3Client = new S3Client(config);

const file = fs.createReadStream("./cow.jpg");

const uploadCommand = new PutObjectCommand({
  Bucket: process.env.S3_BUCKET,
  Key: "cow.jpg",
  Body: file,
  ContentType: "image/jpeg",
});

try {
  await s3Client.send(uploadCommand);
  console.log("nice");
} catch (e) {
  console.log("shit", e);
}
