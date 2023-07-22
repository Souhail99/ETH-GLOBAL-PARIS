// SPDX-License-Identifier: MIT
pragma solidity <=0.8.19;


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
//import "@ethereum-attestation-service/eas-contracts/deployments";
import { IEAS, Attestation } from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
contract Voting is Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;

    // State variables
    address public creator; // For security
    uint256 public minimum;
    uint public numero;
 
    uint256 public votingStartime;
    uint256 public votingEndtime;

    // Add the library methods
    using EnumerableSet for EnumerableSet.AddressSet;
    // Declare a set state variable
    EnumerableSet.AddressSet private lesvoteurs;

    // Etat de la proposition
    enum ProposalState { Pending, Active, Canceled, Defeated, Succeeded, Queued, Expired, Executed }
    ProposalState public state = ProposalState.Pending;

    // Le temps
    uint256 public a;
    uint256 public b;
    uint256 public c;

    // Composition de la proposition
    struct Proposition {
        uint256 id;
        string intitule;
        string petitedescription;
        string description;
        uint256 amountvotesPour;
        uint256 amountvotesContre;
        uint256 amountvotesAbstain;
        bool executee;
        uint begin;
        uint end;
        address proposeur;
        ProposalState state;
    }

    // Donnees du votant
    struct Voter {
        uint256 id;
        address voteur;
        uint poids;
        uint256 amountvotesPour;
        uint256 amountvotesContre;
        uint256 amountvotesAbstain;
    }

    // Mappings
    mapping (uint => Proposition) public propositions;
    mapping (uint256 => Voter[]) public Votants;


    // Event
    event PropositionCree(string intitule, string petitedescription, string description);
    event Votant(uint IDproposition, address voteur, uint256 poseesurlatable);
  

    // Constructor
    constructor() {
        creator = msg.sender;
        numero = 0;
    }

    // Function to create a new proposal
    function newProposition(Attestation calldata attestation, string memory _intitule, string memory _petitedescription, string memory _description, uint _delay, uint _duree) public {
        // Prerequisites
        require(attestation.attester == msg.sender, "You don't have the right to create a proposal.");

        // Start the voting time (100 seconds) with the delay
        votingStartime = block.timestamp + _delay;
        a = block.timestamp;
        b = votingStartime;

        // Set the end time
        votingEndtime = votingStartime + _duree;
        c = votingEndtime;

        // Create the proposition
        Proposition storage result = propositions[numero];
        result.id = numero;
        result.intitule = _intitule;
        result.petitedescription = _petitedescription;
        result.description = _description;
        result.amountvotesPour = 0;
        result.amountvotesContre = 0;
        result.amountvotesAbstain = 0;
        result.executee = false;
        result.begin = votingStartime;
        result.end = votingEndtime;
        result.proposeur = msg.sender;
        result.state = ProposalState.Queued;

        // Increment the ID for future propositions
        numero++;

        // Emit an event for the created proposal
        emit PropositionCree(_intitule, _petitedescription, _description);
    }

    // Function to handle the vote
    function Levote(Attestation calldata attestation, uint _IDproposition, uint _amountvotesPour, uint _amountvotesContre, uint _amountvotesAbstain) public {
        
        require(attestation.attester == msg.sender, "You don't have the right to vote on a proposal.");

        require(block.timestamp >= propositions[_IDproposition].begin, "Voting has not started yet.");
        require(block.timestamp < propositions[_IDproposition].end, "Voting has ended.");
        require(!propositions[_IDproposition].executee, "Proposal is already being voted on.");

        Proposition storage result = propositions[_IDproposition];
        result.state = ProposalState.Pending;


        // Count the votes
        result.amountvotesPour += _amountvotesPour;
        result.amountvotesContre += _amountvotesContre;
        result.amountvotesAbstain += _amountvotesAbstain;

        // Add the voter to the list
        uint256 voteTotaux = _amountvotesPour + _amountvotesContre + _amountvotesAbstain;
        Votants[_IDproposition].push(Voter(_IDproposition, msg.sender, voteTotaux, _amountvotesPour, _amountvotesContre, _amountvotesAbstain));

        // Emit an event for the voter
        emit Votant(_IDproposition, msg.sender, _amountvotesPour + _amountvotesContre + _amountvotesAbstain);
    }

    // Function to execute the proposition
    function executionProposition(uint _IDproposition) public onlyOwner {
        require(_IDproposition <= numero, "This ID does not correspond to a proposition.");
        require(propositions[_IDproposition].state == ProposalState.Active, "Proposal is not active.");

        // Update state to Active
        propositions[_IDproposition].state = ProposalState.Active;


        // Accepted or declined
        if (propositions[_IDproposition].amountvotesPour > propositions[_IDproposition].amountvotesContre + propositions[_IDproposition].amountvotesAbstain) {
            propositions[_IDproposition].executee = true;
            propositions[_IDproposition].state = ProposalState.Succeeded;
        } else {
            propositions[_IDproposition].executee = false;
            propositions[_IDproposition].state = ProposalState.Defeated;
        }
        state = propositions[_IDproposition].state;
    }

    // Function to pay the rewards

    // Function to compare two integers
    function comparaison(uint256 _gamma, uint256 _beta) private pure returns (bool) {
        return _gamma == _beta;
    }

    // Function to refund the balance of the proposition
    

    // Function to check for voting abuses
  
    // Function to return the current ID
    function returnNombre() public view returns (uint) {
        return numero;
    }

    // Function to return the time variables
    function returntime() public view returns (uint256, uint256, uint256) {
        return (a, b, c);
    }

    // Function to get the current time
    function getime() public view returns (uint256) {
        return block.timestamp;
    }

    // Function to return the list of people who voted for the proposal
    function returnVotants(uint _IDproposition) public view onlyOwner returns (Voter[] memory) {
        return Votants[_IDproposition];
    }

    // Function to get a specific proposition by ID
    function getPropositionbyID(uint _id) public view onlyOwner returns (Proposition[] memory propsID) {
        propsID = new Proposition[](numero);
        propsID[0] = propositions[_id];
    }

    // Function to get all propositions
    function getPropositionALL() public view onlyOwner returns (Proposition[] memory props) {
        props = new Proposition[](numero);
        for (uint256 i = 0; i < numero; i++) {
            props[i] = propositions[i];
        }
    }


    // Function for the contract owner to initiate the self-destruction of the contract
    function AutoDestruction(address apocalypse) public onlyOwner {
        selfdestruct(payable(apocalypse));
    }
}
