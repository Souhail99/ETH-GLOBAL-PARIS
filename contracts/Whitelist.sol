// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

//getAttestation(bytes32 uid)
contract Whitelist {
    address public owner;
    address public verifier;

    constructor() {
        owner = msg.sender;
    }

    mapping(uint256 => mapping(bytes32 => bool)) private whitelist;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only scVote can call this function.");
        _;
    }

    function addToWhitelist(
        uint256 propositionId,
        bytes32[] memory sismoIds
    ) external onlyOwner {
        for (uint i = 0; i < sismoIds.length; i++) {
            whitelist[propositionId][sismoIds[i]] = true;
        }
    }

    function makeVote(
        uint256 propositionId,
        bytes32 sismoId
    ) external onlyVerifier {
        whitelist[propositionId][sismoId] = false;
    }
}