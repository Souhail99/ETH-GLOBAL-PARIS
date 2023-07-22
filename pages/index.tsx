import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { SismoConnectComponent } from "../components/buttons/SismoConnectButton";

const inter = Inter({subsets: ['latin']})

export default function Home(){
  return (
    <>
      <main className={styles.main}>
        <SismoConnectComponent/>
        <div className={styles.grid}>
          <Link
            href="/identity"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>

              Identity <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Test our Solution !
            </p>
          </Link>


          <Link
            href="/doc"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about our Project.
            </p>
          </Link>
        </div>
      </main>
    </>
  )
}
