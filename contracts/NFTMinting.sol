pragma solidity ^0.8.0;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.5.0/contracts/token/ERC721/ERC721.sol';
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.5.0/contracts/access/Ownable.sol';

contract NFTMinting is ERC721, Ownable {
  mapping(address => mapping(uint256 => NFT)) public nftOwners;

  struct NFT {
    uint256 tokenId;
    string name;
    string description;
    string image;
  }

  event NFTMinted(uint256 tokenId, string name, string description, string image);

  function mintNFT(string memory _name, string memory _description, string memory _image) public onlyOwner {
    uint256 tokenId = uint256(keccak256(abi.encodePacked(_name, _description, _image)));
    NFT memory nft = NFT(tokenId, _name, _description, _image);
    nftOwners[msg.sender][tokenId] = nft;
    _mint(msg.sender, tokenId);
    emit NFTMinted(tokenId, _name, _description, _image);
  }

  function getNFT(uint256 _tokenId) public view returns (NFT memory) {
    return nftOwners[msg.sender][_tokenId];
  }
}