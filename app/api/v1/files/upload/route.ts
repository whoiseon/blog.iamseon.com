import { NextRequest, NextResponse } from 'next/server';
import { s3 } from '@/src/shared/lib/utils/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { S3_BUCKET_NAME, S3_IMAGE_ENDPOINT } from '@/src/shared/consts';
import {
  generateFilePath,
  generateNextResponse,
} from '@/src/shared/lib/utils/api';
import { UploadImagePayload } from '@/src/shared/entities';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;
    const Body = (await image.arrayBuffer()) as Buffer;

    if (!image) {
      return generateNextResponse<UploadImagePayload>({
        error: 'Image not found',
        payload: {
          path: '',
        },
      });
    }

    // 5mb limit
    if (image.size > 5242880) {
      return generateNextResponse<UploadImagePayload>({
        error: 'Image size is too large',
        payload: {
          path: '',
        },
      });
    }

    const Key = generateFilePath(image.name);

    await s3.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key, // file name
        Body,
        ContentType: 'image/*',
      }),
    );

    return generateNextResponse<UploadImagePayload>({
      error: '',
      payload: {
        path: `${S3_IMAGE_ENDPOINT}/${Key}`,
      },
    });
  } catch (e) {
    console.log('error', e);
    return generateNextResponse<UploadImagePayload>({
      error: 'upload failed',
      payload: {
        path: '',
      },
    });
  }
}
