import '../styles/globals.css'
import type { AppProps } from 'next/app'
import HeaderComponent from "../components/header"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className=''>
        <div>
          <HeaderComponent mode={'light'}></HeaderComponent>
        </div>
          <Component {...pageProps} />
      </main> 
    </>
  ) 
}
