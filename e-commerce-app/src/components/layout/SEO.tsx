import Head from 'next/head';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

export function SEO({
  title = 'Ecom - Your Store',
  description = 'Your trusted destination for quality products and exceptional shopping experience.',
  keywords = 'ecommerce, shop, online store',
  ogImage = '/og-image.jpg',
  ogUrl = 'https://yourstore.com',
}: SEOProps) {
  const fullTitle = `${title} | Your Store`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      
      {/* Other */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}