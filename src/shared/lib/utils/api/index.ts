import { NextResponse } from 'next/server';
import { v4 as generateUUID } from 'uuid';
import { getTodayDateToString } from '@/src/shared/lib/utils';

type GenerateNextResponseParams<T> = {
  error: string;
  payload: T;
  headers?: HeadersInit;
};

export function generateNextResponse<T>({
  error,
  payload,
  headers,
}: GenerateNextResponseParams<T>) {
  return NextResponse.json(
    {
      error,
      payload,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        ...headers,
      },
      status: 200,
    },
  );
}

const getFileExtension = (filename: string) => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

const generateFileName = (filename: string) => {
  const extension = getFileExtension(filename);
  const uuid = generateUUID();

  return `${uuid}.${extension}`;
};

export const generateFilePath = (
  filename: string,
  type: 'post' | 'thumbnail',
) => {
  const today = getTodayDateToString();
  const fileName = generateFileName(filename);

  return `${today}/${type}/${fileName}`;
};
