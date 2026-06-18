import { ethers } from 'ethers';
import { NFTMetadata } from './nftMetadata';

interface MintNFTParams {
  name: string;
  description: string;
  image: string;
}

const createNFTMetadata = async (params: MintNFTParams) => {
  const metadata = await NFTMetadata.createMetadata(params);
  return metadata;
};

const getNFTMetadata = async (tokenId: number) => {
  const metadata = await NFTMetadata.getMetadata(tokenId);
  return metadata;
};

const validateNFTMetadata = (metadata: any) => {
  if (!metadata.name || !metadata.description || !metadata.image) {
    throw new Error('Invalid NFT metadata');
  }
  return metadata;
};

export { createNFTMetadata, getNFTMetadata, validateNFTMetadata };