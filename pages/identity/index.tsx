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
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className={styles.main}>

      <SismoConnectButton
      config={{
        appId: "0xf4977993e52606cfd67b7a1cde717069", // replace with your appId
        vault: {
          // For development purposes insert the Data Sources that you want to impersonate here
          // Never use this in production
          impersonate: [
            // EVM
            "leo21.sismo.eth",
            "0xA4C94A6091545e40fc9c3E0982AEc8942E282F38",
            "0x1b9424ed517f7700e7368e34a9743295a225d889",
            "0x82fbed074f62386ed43bb816f748e8817bf46ff7",
            "0xc281bd4db5bf94f02a8525dca954db3895685700",
            // Github
            "github:leo21",
            // Twitter
            "twitter:leo21_eth",
            // Telegram
            "telegram:leo21",
          ],
        },
        // displayRawResponse: true,
      }}
      // request proof of Data Sources ownership (e.g EVM, GitHub, twitter or telegram)
      auths={[{ authType: AuthType.GITHUB }]}
      // request zk proof that Data Source are part of a group
      // (e.g NFT ownership, Dao Participation, GitHub commits)
      claims={[
        // ENS DAO Voters
        { groupId: "0x85c7ee90829de70d0d51f52336ea4722" }, 
        // Gitcoin passport with at least a score of 15
        { groupId: "0x1cde61966decb8600dfd0749bd371f12", value: 15, claimType: ClaimType.GTE }
      ]} 
      // request message signature from users.
      signature={{ message: "I vote Yes to Privacy" }}
      // retrieve the Sismo Connect Reponse from the user's Sismo data vault
      onResponse={async (response: SismoConnectResponse) => {
        const res = await fetch("/api/verify", {
          method: "POST",
          body: JSON.stringify(response),
        });
        console.log(await res.json());
      }}
      // reponse in bytes to call a contract
      // onResponseBytes={async (response: string) => {
      //   console.log(response);
      // }}
    />
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
          <a
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
          </a>

          <a>
          
          </a>

          <a>
           
          </a>

          <a
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
          </a>
        </div>
      </main>
    </>
  )
}
