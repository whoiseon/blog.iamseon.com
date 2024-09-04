import { getListSeries, getPostList } from '@/src/shared/lib/api';

const siteUrl = 'https://iamseon.com';

export default async function sitemap() {
  const postList = await getPostList({});
  const seriesList = await getListSeries();

  const posts = postList.payload?.list.map((post) => ({
    url: `${siteUrl}/post/${post.urlSlug}`,
    lastModified:
      new Date(post.updatedAt).toISOString().split('T')[0] ??
      new Date(post.createdAt).toISOString().split('T')[0],
  }));

  const series = seriesList.payload?.map((item) => ({
    url: `${siteUrl}/series/${item.urlSlug}`,
    lastModified:
      new Date(item.updatedAt).toISOString().split('T')[0] ??
      new Date(item.createdAt).toISOString().split('T')[0],
  }));

  const routes = ['', '/series', '/tags'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...(series || []), ...(posts || [])];
}
