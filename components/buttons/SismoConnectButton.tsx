// Next.js https://nextjs.org/docs/getting-started/installation
// in src/page.tsx
"use client";

import {
  SismoConnectButton,
  AuthType,
  SismoConnectResponse,
  ClaimType,
  SismoConnect,
  SismoConnectConfig,
} from "@sismo-core/sismo-connect-react";

export const SismoConnectComponent = () => {
  type VaultConfig = {
    impersonate: string[];
  };

  const appId: string = "0xedae8cc49b4f32e436691771aadd5393";
  const config: SismoConnectConfig = {
    appId: appId,
  };

  //const sismoConnect = SismoConnect({config});

  return (
    <SismoConnectButton
      config={{
        appId: appId, // replace with your appId
        // displayRawResponse: true,
      }}
      // request proof of Data Sources ownership (e.g EVM, GitHub, twitter or telegram)
      auths={[{ authType: AuthType.EVM_ACCOUNT }]}
      // request zk proof that Data Source are part of a group
      // (e.g NFT ownership, Dao Participation, GitHub commits)
      claims={[]}
      // request message signature from users.
      signature={{ message: "I vote Yes to Privacy" }}
      // retrieve the Sismo Connect Reponse from the user's Sismo data vault
      onResponse={async (response: SismoConnectResponse) => {
        console.log(response);
        const res1 = await fetch("/api/hello", {
          method: "POST",
          body: JSON.stringify(response),
        });
        console.log(await res1.json());
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
  );
};
