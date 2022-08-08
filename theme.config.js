export default {
  footer: <p>MIT 2022 © Ri1ken.</p>,
  head: ({ title, meta }) => (
    <>
      {meta.description && <meta name="description" content={meta.description} />}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  readMore: 'Read More →',
  titleSuffix: null,
  postFooter: null,
  cusdis: {
    appId: 'your_app_id',
    host: 'your_host(optional)',
    lang: 'your_lang'
  },
  darkMode: false,
  navs: [
    {
      url: 'https://github.com/Kiotlin/ri1ken.blog',
      name: 'ri1ken.blog'
    }
  ]
}