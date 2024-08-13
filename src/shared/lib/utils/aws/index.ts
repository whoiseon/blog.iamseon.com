import { S3Client } from '@aws-sdk/client-s3';
import {
  S3_ACCESS_KEY_ID,
  S3_ENDPOINT,
  S3_REGION_NAME,
  S3_SECRET_ACCESS_KEY,
} from '@/src/shared/consts';

export const s3 = new S3Client({
  forcePathStyle: true,
  region: S3_REGION_NAME,
  endpoint: S3_ENDPOINT,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
});
