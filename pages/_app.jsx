import 'nextra-theme-blog/style.css'
import '../styles/main.css'

import { Analytics } from '@vercel/analytics/react'

export default function Nextra({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <Analytics />
    </>
  )
}
