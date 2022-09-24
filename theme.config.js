const YEAR = new Date().getFullYear();

export default {
  head: ({ meta }) => {
    return (
      <>
        <title>{meta.title + ' - iken.moe'}</title>
        <meta name="author" content="ri1ken" />
        <link rel="canonical" href="https://iken.moe" />
        <meta name="title" content={meta.title + ' - iken.moe'} />
        <meta property="description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content="https://iken.moe" />
        <meta
          property="og:image"
          content={meta.image || "https://iken.moe/logo.png"}
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@Kiokh_" />
        <meta property="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:url" content="https://iken.moe" />
        <meta
          property="twitter:image"
          content={meta.image || "https://iken.moe/logo.png"}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
      </>
    );
  },
  footer: (
    <div>
      <hr />
      <a href="https://twitter.com/Kiokh_" target="_blank">
        Twitter
      </a>{" "}
      ·{" "}
      <a href="https://github.com/Kiotlin" target="_blank">
        GitHub
      </a>{" "}
      ·{" "}
      <a href="mailto:r@iken.moe" target="_blank">
        r@iken.moe
      </a>
      <small style={{ display: "block", marginTop: "8rem" }}>
        <abbr
          title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
          style={{ cursor: "help" }}
        >
          CC BY-NC 4.0
        </abbr>{" "}
        <time>{YEAR}</time> © ri1ken.
        <a href="/feed.xml">RSS</a>
        <style jsx>{`
          a {
            float: right;
          }
        `}</style>
      </small>
    </div>
  ),
  readMore: 'Read More →',
  titleSuffix: null,
  postFooter: null,
  darkMode: true
}