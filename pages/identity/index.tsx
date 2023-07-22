"use client";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../../styles/Home.module.css'

import {
  SismoConnectButton,
  AuthType,
  SismoConnectResponse,
  ClaimType,
} from "@sismo-core/sismo-connect-react";
import Link from "next/link";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>
         
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <Link href="/identity" title="Identity" className={styles.card} >
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
