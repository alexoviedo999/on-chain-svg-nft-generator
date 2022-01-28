// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract RandomSVG is ERC721URIStorage, VRFConsumerBase {
    bytes32 public keyHash;
    uint256 public fee;
    uint256 public tokenCounter;
    mapping(bytes32 => address) public requestIdToSender;
    mapping(uint256 => uint256) public tokenIdToRandomNumber;
    mapping(bytes32 => uint256) public requestIdToTokenId;

    event requestedRandomSVG(bytes32 indexed requestId, uint256 indexed tokenId);

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyHash, uint256 _fee) 
        VRFConsumerBase(_VRFCoordinator, _LinkToken) 
        ERC721 ("RandomSVG", "rsNFT") {
            fee = _fee;
            keyHash = _keyHash;
            tokenCounter = 0;
    }

    function create() public returns (bytes32 requestId) {
        // get a random number
        requestId = requestRandomness(keyHash, fee);
        requestIdToSender[requestId] = msg.sender;
        uint tokenId = tokenCounter;
        requestIdToTokenId[requestId] = tokenId;
        tokenCounter = tokenCounter + 1;
        emit requestedRandomSVG(requestId, tokenId);
        // use that random number to generate some random SVG code
        // base64 encode the SVG code
        // get the tokenURI and mint the NFT

    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        address nftOwner = requestIdToSender[requestId];
        uint256 tokenId = requestIdToTokenId[requestId];
        tokenIdToRandomNumber[tokenId] = randomNumber;
    }

    function finishMint() public {

    }

}