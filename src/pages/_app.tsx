import '@/styles/globals.css'
import InnvoApolloProvider from 'graphql/apollo'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return  <InnvoApolloProvider><Component {...pageProps} /></InnvoApolloProvider>
}
export default  App;
