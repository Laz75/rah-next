import '../styles/variables.scss'
import '../styles/globals.css'
import 'normalize.css/normalize.css';
import type { AppProps } from 'next/app'
import dayjs from 'dayjs';
dayjs.locale('it')

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
