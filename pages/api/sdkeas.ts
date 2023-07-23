// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
const { ethers } = require("ethers");


// // Partie 1: Create a Schema
// const schemaRegistryContractAddress = "0xYourSchemaRegistryContractAddress";
// const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
// const signer = ethers.getDefaultSigner(); // Replace with the signer you want to use

// const schema = "uint256 proposalID, bool voted";
// const resolverAddress = "MettonadresseAlexis"; // Replace with the actual address
// const revocable = true;

// const transaction = await schemaRegistry.register({
//   schema,
//   resolverAddress,
//   revocable,
// });

// // Optional: Wait for transaction to be validated
// await transaction.wait();

import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
declare var window: any
const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {

    const body = req.body;
    var response = JSON.stringify(body);
    var json = JSON.parse(response);
    // Partie 2: Retrieve the Schema Address
    const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
    const eas = new EAS(EASContractAddress);
    // const privateKey = 'YOUR_PRIVATE_KEY';
    // const provider = ethers.getDefaultProvider(
    //     "sepolia"
    // );
    // const wallet = new ethers.Wallet(privateKey, provider);
    // const signer = wallet.connect(provider);
    // const providerUrl = 'YOUR_PROVIDER_URL'; // URL of the Ethereum node or custom network provider
  
    // // Connect to a read-only (query) provider
    // const providers = new ethers.JsonRpcProvider(providerUrl);
    // const [address] = await providers.listAccounts()
    //const signera = provider.

    
    // Assuming you have the following variables with valid values:
    //const privateKey = 'YOUR_PRIVATE_KEY'; // Private key of the Ethereum account for signing transactions
    //const providerUrl = 'YOUR_PROVIDER_URL'; // URL of the Ethereum node or custom network provider

    const provider = ethers.providers.getDefaultProvider(
        "sepolia"
      );
    eas.connect(provider);
    const privateKey = 'YOUR_PRIVATE_KEY';
    // const provider = ethers.getDefaultProvider('sepolia');
    // const signer = new ethers.Wallet(privateKey, provider);
    // Partie 3: Create an Attestation
    const schemaEncoder = new SchemaEncoder("uint256 proposalID, string IDuser");
    const encodedData = schemaEncoder.encodeData([
      { name: "proposalID", value: json["proposalID"], type: "uint256" },
      { name: "IDuser", value: json["userIDdeSismo"], type: "string" }
    ]);

    const schemaUID = "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";
    const signer = new ethers.Wallet(privateKey, provider);
    eas.connect(signer);
    //const signer = ethers.getDefaultSigner(); // Replace with the signer you want to use
    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: json["Vault"], // Replace with the recipient address
        expirationTime: 0,
        revocable: true,
        data: encodedData,
      },
    });

    const newAttestationUID = await tx.wait();

    console.log("New attestation UID:", newAttestationUID);
    
    res.redirect(`https://easscan.org/attestation/view/${newAttestationUID}`);

  } else if (req.method === 'GET') {

    res.status(200).json("A");
  } else {
    res.status(200).json(req.body);
  }
}