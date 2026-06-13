pragma solidity ^0.8.17;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.0/contracts/token/ERC721/ERC721.sol';
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.0/contracts/access/Ownable.sol';

contract NFTMarketplace is ERC721, Ownable {
  struct NFT {
    uint256 id;
    string name;
    string description;
    string image;
    address owner;
    uint256 price;
  }

  mapping(uint256 => NFT) public nfts;
  mapping(address => uint256[]) public userNFTs;

  event NFTMinted(uint256 indexed id, string name, string description, string image);
  event NFTBought(uint256 indexed id, address buyer, uint256 price);
  event NFTSold(uint256 indexed id, address seller, uint256 price);

  function mintNFT(string memory _name, string memory _description, string memory _image) public {
    uint256 id = uint256(keccak256(abi.encodePacked(_name, _description, _image)));
    nfts[id] = NFT(id, _name, _description, _image, msg.sender, 0);
    userNFTs[msg.sender].push(id);
    emit NFTMinted(id, _name, _description, _image);
  }

  function buyNFT(uint256 _id) public payable {
    require(nfts[_id].owner != msg.sender, 'You cannot buy your own NFT');
    require(msg.value >= nfts[_id].price, 'Insufficient funds');
    nfts[_id].owner = msg.sender;
    userNFTs[msg.sender].push(_id);
    emit NFTBought(_id, msg.sender, msg.value);
  }

  function sellNFT(uint256 _id, uint256 _price) public {
    require(nfts[_id].owner == msg.sender, 'You do not own this NFT');
    nfts[_id].price = _price;
    emit NFTSold(_id, msg.sender, _price);
  }

  function getNFTs() public view returns (uint256[] memory) {
    return userNFTs[msg.sender];
  }

  function getUserProfile(address _account) public view returns (string memory, string memory) {
    // TO DO: implement user profile
    return ('', '');
  }
}