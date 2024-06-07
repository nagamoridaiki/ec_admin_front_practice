import AWS from 'aws-sdk';

export const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
export const REGION = process.env.NEXT_PUBLIC_REGION;

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  region: REGION
});
