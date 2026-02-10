import { siteConfig } from '@/config/site'
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/routing'
import { getPosts } from '@/lib/getBlogs'
import { MetadataRoute } from 'next'

const siteUrl = siteConfig.url

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | undefined

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    '',
    '/the-forge-codes',
    '/the-forge-codes/february-2026',
    '/how-to-redeem-the-forge-codes',
    '/the-forge-codes-faq',
    '/the-forge-codes-history',
    '/about',
    '/privacy-policy',
    '/terms-of-service',
  ]

  // Generate multilingual pages
  const pages = LOCALES.flatMap(locale => {
    return staticPages.map(page => ({
      url: `${siteUrl}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${page}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: page === '' ? 1.0 : 0.8,
    }))
  })

  const blogPages = (
    await Promise.all(
      LOCALES.map(async (locale) => {
        const localePrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
        const { posts } = await getPosts(locale)

        const blogIndex = {
          url: `${siteUrl}${localePrefix}/blog`,
          lastModified: new Date(),
          changeFrequency: 'daily' as ChangeFrequency,
          priority: 0.7,
        }

        const postPages = posts
          .filter(post => Boolean(post.slug))
          .map(post => {
            const normalizedSlug = post.slug.startsWith('/') ? post.slug : `/${post.slug}`
            const postPath = normalizedSlug.startsWith('/blog/')
              ? normalizedSlug
              : `/blog${normalizedSlug}`

            return {
              url: `${siteUrl}${localePrefix}${postPath}`,
              lastModified: post.date ? new Date(post.date) : new Date(),
              changeFrequency: 'weekly' as ChangeFrequency,
              priority: 0.6,
            }
          })

        return [blogIndex, ...postPages]
      })
    )
  ).flat()

  return [
    ...pages,
    ...blogPages,
  ]
}
