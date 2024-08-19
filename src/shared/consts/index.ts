const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || '';
const S3_REGION_NAME = process.env.S3_REGION_NAME || '';
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID || '';
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || '';
const S3_ENDPOINT = process.env.S3_ENDPOINT || '';

const S3_IMAGE_ENDPOINT = process.env.S3_IMAGE_ENDPOINT || '';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export {
  S3_BUCKET_NAME,
  S3_REGION_NAME,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_ENDPOINT,
  S3_IMAGE_ENDPOINT,
  API_ENDPOINT,
};
