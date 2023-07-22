// Next.js https://nextjs.org/docs/getting-started/installation
// in src/page.tsx
"use client";

import {
  SismoConnectButton,
  AuthType,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";
import { useEffect, useState } from "react";

export const SismoConnectComponent = () => {
  const appId: string = "0xedae8cc49b4f32e436691771aadd5393";
  const [responseBytes, setResponseBytes] = useState<string | null>(null);
  const [response, setResponse] = useState<SismoConnectResponse | null>(null);
  const [finished, setFinished] = useState<boolean>(false);

  async function Vote(responseeeeee: any, responseeeeeeBytes: any) {
    setFinished(true);
    console.log(responseeeeee);
    const endpoint = "api/verifier";
    const data = {
      proof: responseeeeee,
      Bytes: responseeeeeeBytes,
    };
    // Send the data to the server in JSON format.
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await fetch(endpoint, options);
    console.log(await res.json());
  }

  useEffect(() => {
    if (!response) return;
    if (!responseBytes) return;

    if (finished) return;
    Vote(response, responseBytes);
  }, [responseBytes, response]);

  return (
    <SismoConnectButton
      config={{
        appId: appId, // replace with your appId
      }}
      auths={[{ authType: AuthType.VAULT }]}
      claims={[{ groupId: "0x9b72562239c38dbc6fe8a0ff443019bf" }]}
      signature={{ message: "0x00" }}
      onResponse={(response: SismoConnectResponse) => {
        setResponse(response);
      }}
      // responseBytes = the response from Sismo Connect, will be sent onchain
      onResponseBytes={(responseBytes: string) => {
        setResponseBytes(responseBytes);
      }}
    />
  );
};
