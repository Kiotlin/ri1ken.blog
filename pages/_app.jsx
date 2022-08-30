import 'nextra-theme-blog/style.css'
import '../styles/main.css'

export default function Nextra({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}
