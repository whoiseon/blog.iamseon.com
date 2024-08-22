export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://imslow.me/sitemap.xml',
    host: 'https://imslow.me',
  };
}
