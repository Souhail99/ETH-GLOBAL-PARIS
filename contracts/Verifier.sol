// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@sismo-core/sismo-connect-solidity/contracts/libs/SismoLib.sol";

// This is a sample contract that shows how to use the SismoConnect library
contract Verifier is SismoConnect {
    event ResponseVerified(SismoConnectVerifiedResult result);

    constructor()
        SismoConnect(
            buildConfig({
                // replace with your appId from the Sismo factory https://factory.sismo.io/
                // should match the appId used to generate the response in your frontend
                appId: 0xedae8cc49b4f32e436691771aadd5393,
                // For development purposes insert when using proofs that contains impersonation
                // Never use this in production
                isImpersonationMode: true
            })
        )
    {}

    function verifySismoConnectResponse(bytes memory response) public {
        // build the auth and claim requests that should match the response
        AuthRequest[] memory auths = new AuthRequest[](1);
        auths[0] = buildAuth({authType: AuthType.VAULT});

        ClaimRequest[] memory claims = new ClaimRequest[](1);
        // ENS DAO Voters
        claims[0] = buildClaim({groupId: 0x9b72562239c38dbc6fe8a0ff443019bf});

        // verify the response regarding our original request
        SismoConnectVerifiedResult memory result = verify({
            responseBytes: response,
            auths: auths,
            claims: claims,
            signature: buildSignature({message: "0x00"})
        });

        emit ResponseVerified(result);
    }
}
