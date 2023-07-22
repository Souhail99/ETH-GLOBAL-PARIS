// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  SismoConnect,
  SismoConnectVerifiedResult,
  AuthType,
} from "@sismo-core/sismo-connect-server";
import {
  SismoConnectConfig,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";

type Data = {
  name: string;
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    // Process a POST request
    // const sismoConnectResponse: SismoConnectResponse = req.body;
    // const appId: string = "0xedae8cc49b4f32e436691771aadd5393";
    // const config: SismoConnectConfig = {
    //   appId: appId,
    // };
    // const sismoConnect = SismoConnect({ config });
    // // verifies the proofs contained in the sismoConnectResponse
    // const result: SismoConnectVerifiedResult = await sismoConnect.verify(
    //   sismoConnectResponse,
    //   {
    //     // signature request must be made with at least an auth or one claim
    //     auths: [{ authType: AuthType.EVM_ACCOUNT }],
    //     // your signature request
    //     signature: { message: "0x00" },
    //   }
    // );
  } else {
    res.status(200).json({ name: "edrfgthyj" });
  }
}
