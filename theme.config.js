const YEAR = new Date().getFullYear();

export default {
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