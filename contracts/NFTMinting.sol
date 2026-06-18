pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/SafeERC721.sol";

contract NFTMinting {
  mapping(address => mapping(uint256 => NFT)) public nftOwners;
  mapping(uint256 => NFT) public nftList;

  struct NFT {
    uint256 id;
    string name;
    string description;
    string image;
  }

  event NFTMinted(address owner, uint256 id, string name, string description, string image);

  function mintNFT(address owner, string memory name, string memory description, string memory image) public {
    uint256 id = nftList.length++;
    nftList[id] = NFT(id, name, description, image);
    nftOwners[owner][id] = nftList[id];
    emit NFTMinted(owner, id, name, description, image);
  }

  function getNFT(uint256 id) public view returns (NFT memory) {
    return nftList[id];
  }
}