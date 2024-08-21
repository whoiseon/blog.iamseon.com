import type { NextApiRequest } from 'next';
import { headers } from 'next/headers';

export function getIP() {
  const header = headers();
  const xff = header.get('x-forwarded-for');

  return xff ? (Array.isArray(xff) ? xff[0] : xff.split(',')[0]) : '127.0.0.1';
}

export function isAllowedUser() {
  const ip = getIP();
  const allowedIPs = process.env.ALLOWED_IP?.split(';') || [];

  return allowedIPs.includes(ip);
}
