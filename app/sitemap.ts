import { getListSeries, getPostList } from '@/src/shared/lib/api';

const siteUrl = 'https://imslow.me';

export default async function sitemap() {
  const postList = await getPostList({});

  const posts = postList.payload?.list.map((post) => ({
    url: `${siteUrl}/post/${post.urlSlug}`,
    lastModified:
      post.updatedAt.toDateString().split('T')[0] ??
      post.createdAt.toDateString().split('T')[0],
  }));

  const seriesList = await getListSeries();

  const series = seriesList.payload?.map((item) => ({
    url: `${siteUrl}/series/${item.urlSlug}`,
    lastModified:
      item.updatedAt.toISOString().split('T')[0] ??
      item.createdAt.toISOString().split('T')[0],
  }));

  const routes = ['', '/series', '/tags'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...(series || []), ...(posts || [])];
}
