import {
  SismoConnectConfig,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";
import {
  SismoConnect,
  SismoConnectVerifiedResult,
  AuthType,
} from "@sismo-core/sismo-connect-server";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const appId: string = "0xedae8cc49b4f32e436691771aadd5393";
    const config: SismoConnectConfig = {
      appId: appId,
    };

    const sismoConnect = SismoConnect({ config });

    async function verifyResponse(sismoConnectResponse: SismoConnectResponse) {
      // verifies the proofs contained in the sismoConnectResponse
      const result: SismoConnectVerifiedResult = await sismoConnect.verify(
        sismoConnectResponse,
        {
          // request proof of Data Sources ownership (e.g EVM, GitHub, twitter or telegram)
          auths: [{ authType: AuthType.VAULT }],
          // request zk proof that Data Source are part of a group
          // (e.g NFT ownership, Dao Participation, GitHub commits)
          claims: [{ groupId: "0x9b72562239c38dbc6fe8a0ff443019bf" }],
          // request message signature from users.
          signature: { message: "0x00" },
        }
      );
      return result;
    }
    const result = await verifyResponse(req.body.proof);
    const vaultId = result.getUserId(AuthType.VAULT);
    res.status(200).json({ all: result, vaultId: vaultId });
  } else {
    res.status(200).json({ name: "edrfgthyj" });
  }
}
