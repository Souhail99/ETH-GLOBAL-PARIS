// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//getAttestation(bytes32 uid) 
contract Whitelist {
    struct User {
        bool isWhitelisted;
        bytes32 utilisateur;
        uint256 proposalId;
    }

    mapping(bytes32 => User) private whitelist;
    bytes32[] private members;

    // Fonction pour enregistrer un utilisateur dans la whitelist avec un ID de proposition associé
    function enregistrer(bytes32 utilisateur, uint256 propositionId) external {
        //require(!estDansWhitelistGen(utilisateur), "L'utilisateur est deja dans la whitelist");
        require(!estDansWhitelist(utilisateur,propositionId), "L'utilisateur est deja dans la whitelist");
        whitelist[utilisateur] = User(true, utilisateur, propositionId);
        members.push(utilisateur);
    }

    // Fonction pour obtenir la liste de tous les membres de la whitelist
    function membres() external view returns (bytes32[] memory) {
        return members;
    }

    function estDansWhitelist(bytes32 utilisateur, uint256 propositionId) public view returns (bool) {
        return whitelist[utilisateur].isWhitelisted && whitelist[utilisateur].proposalId == propositionId;
    }

    function estDansWhitelistGen(bytes32 utilisateur) public view returns (bool) {
        return whitelist[utilisateur].isWhitelisted;
    }
}