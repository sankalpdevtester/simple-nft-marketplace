import { ethers } from 'ethers';
import { NFTMarketplace } from '../utils/constants';

const getNFTPrice = async (contract: ethers.Contract, nftId: number) => {
  const nft = await contract.getNFT(nftId);
  return nft.price;
};

const getNFTOwner = async (contract: ethers.Contract, nftId: number) => {
  const nft = await contract.getNFT(nftId);
  return nft.owner;
};

const isNFTForSale = async (contract: ethers.Contract, nftId: number) => {
  const nft = await contract.getNFT(nftId);
  return nft.forSale;
};

export { getNFTPrice, getNFTOwner, isNFTForSale };