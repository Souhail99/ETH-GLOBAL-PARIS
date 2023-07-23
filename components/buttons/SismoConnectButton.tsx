import { useEffect, useState } from "react";
import {
  SismoConnectButton,
  AuthType,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";
import { encodeAbiParameters } from "viem";

export const SismoConnectComponent = () => {
  const [responseBytes, setResponseBytes] = useState<string | null>(null);
  const [response, setResponse] = useState<SismoConnectResponse | null>(null);
  const [finished, setFinished] = useState<boolean>(false);
  const appId = "0xedae8cc49b4f32e436691771aadd5393";

  const sendVerifierData = async (proof: any, Bytes: any) => {
    try {
      setFinished(true);
      const data = {
        proof: proof,
        Bytes: Bytes,
      };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const res = await fetch("api/verifier", options);
      console.log(await res.json());

      const options2 = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Bytes),
      };
      console.log("Bytes", Bytes);
      const res2 = await fetch("api/sendtx", options2);
      const result = await res2.json();
      console.log(result);
    } catch (error) {
      console.error("Error sending verifier data:", error);
    }
  };

  useEffect(() => {
    if (response !== null && responseBytes !== null && !finished) {
      sendVerifierData(response, responseBytes);
    }
  }, [responseBytes, response, finished]);

  return (
    <SismoConnectButton
      config={{
        appId: appId, // replace with your appId
      }}
      auths={[{ authType: AuthType.VAULT }]}
      claims={[{ groupId: "0x9b72562239c38dbc6fe8a0ff443019bf" }]}
      signature={{
        message: encodeAbiParameters(
          [{ type: "string", name: "blabla" }],
          ["0x00" as `0x${string}`]
        ),
      }}
      onResponse={(response: SismoConnectResponse) => {
        setResponse(response);
      }}
      onResponseBytes={(responseBytes: string) => {
        setResponseBytes(responseBytes);
      }}
    />
  );
};
