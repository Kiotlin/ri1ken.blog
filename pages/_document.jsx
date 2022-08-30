import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const meta = {
      siteName: 'ri1ken',
      description: 'The independent personality of ri1ken',
      url: 'https://iken.moe',
      twitter: '@Kiokh_',
    }

    return (
      <Html lang="zh">
        <Head>
          <meta name="robots" content="follow, index" />
          <meta name="description" content={meta.description} />
          <meta property="og:site_name" content={meta.siteName} />
          <meta property="og:url" content={meta.url} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={meta.twitter} />
          <meta name="twitter:description" content={meta.description} />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS"
            href="/atom.xml"
          />
          <link
            rel="preload"
            href="/fonts/Inter-roman.latin.var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
