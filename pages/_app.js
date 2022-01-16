import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-PTKKB6EMQV"></script>
      <script
          dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PTKKB6EMQV');
          `
          }}
      />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
