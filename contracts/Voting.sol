// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Voting is Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;

    // State variables
    address public creator; // For security
    address public verifier;
    address public whitelist;
    uint256 public proposalId;

    uint256 public votingStartime;
    uint256 public votingEndtime;

    // Declare a set state variable
    EnumerableSet.AddressSet private lesvoteurs;

    // Etat de la Proposal
    enum ProposalState {
        Pending,
        Active,
        Closed
    }

    // Composition de la Proposal
    struct Proposal {
        uint256 id;
        string name;
        string description;
        string[] choices;
        uint256[] votes;
        uint256 begin;
        uint256 end;
        ProposalState state;
    }

    // Mappings
    mapping(uint256 => Proposal) public proposals;

    // Event
    event createProposal(string name, string description);
    event resultProposal(uint256 proposalId, uint256[] votes);

    // Constructor
    constructor() {
        creator = msg.sender;
    }

    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only scVote can call this function.");
        _;
    }

    // Function to create a new proposal
    function newProposal(
        string memory _name,
        string memory _description,
        uint256 _delay,
        uint256 _duree,
        string[] _choices
    ) public onlyOwner {
        // Start the voting time (100 seconds) with the delay
        votingStartime = block.timestamp + _delay;

        // Set the end time
        votingEndtime = votingStartime + _duree;

        // Create the Proposal
        Proposal memory proposal = Proposal({
            id: proposalId,
            name: _name,
            description: _description,
            choices: _choices,
            votes: new uint256[](choices.length),
            begin: votingStartime,
            end: votingEndtime,
            state: ProposalState.Active
        });

        // store proposal
        proposals[proposalId] = proposal;

        // Increment the ID for future Proposals
        proposalId++;

        // Emit an event for the created proposal
        emit createProposal(_name, _description);
    }

    // Function to handle the vote
    function vote(uint256 _IDProposal, string choices) public onlyVerifier {
        require(
            block.timestamp >= proposals[_IDProposal].begin,
            "Voting has not started yet."
        );
        require(
            block.timestamp < proposals[_IDProposal].end,
            "Voting has ended."
        );
        require(
            proposals[_IDProposal].state == ProposalState.Active,
            "Proposal is not in status Active"
        );

        uint256 indexChoice = -1;
        for (uint256 i = 0; i < proposals[_IDProposal].choices.length; i++) {
            if (proposals[_IDProposal].choices[i] == choices) {
                indexChoice = i;
            }
        }
        uint256 currentVote = proposals[_IDProposal].votes[indexChoice] + 1;
    }

    // Function to execute the Proposal
    function closeProposal(uint256 _IDProposal) public onlyOwner {
        require(
            _IDProposal < proposalId,
            "This ID does not correspond to a Proposal."
        );
        require(
            proposals[_IDProposal].state == ProposalState.Active,
            "Proposal is not active."
        );

        // Update state to Active
        proposals[_IDProposal].state = ProposalState.Closed;

        // Emit an event for the closed proposal
        emit resultProposal(_IDProposal, proposals[_IDProposal].votes);
    }
}
