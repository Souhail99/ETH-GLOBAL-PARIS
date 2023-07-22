// Next.js https://nextjs.org/docs/getting-started/installation
// in src/page.tsx
"use client";

import {
  SismoConnectButton,
  AuthType,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";

export const SismoConnectComponent = () => {
  const appId: string = "0xedae8cc49b4f32e436691771aadd5393";

  return (
    <SismoConnectButton
      config={{
        appId: appId, // replace with your appId
      }}
      auths={[{ authType: AuthType.VAULT }]}
      claims={[{ groupId: "0x9b72562239c38dbc6fe8a0ff443019bf" }]}
      signature={{ message: "0x00" }}
      onResponse={async (response: SismoConnectResponse) => {
        console.log(response);
        const endpoint = "api/verifier";
        const data = {
          proof: response,
        };
        // Send the data to the server in JSON format.
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };
        const res = await fetch(endpoint, options);
        console.log(await res.json());
      }}
    />
  );
};
