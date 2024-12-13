import { headers } from 'next/headers';

export async function getIP() {
  const header = await headers();
  const xff = header.get('x-forwarded-for');

  return xff ? (Array.isArray(xff) ? xff[0] : xff.split(',')[0]) : '127.0.0.1';
}

export async function isAllowedUser() {
  const ip = await getIP();
  const allowedIPs = process.env.ALLOWED_IP?.split(';') || [];

  return allowedIPs.includes(ip);
}
