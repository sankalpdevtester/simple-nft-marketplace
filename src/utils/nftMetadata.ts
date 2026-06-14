import { ethers } from 'ethers';
import axios from 'axios';

// Define the NFT metadata interface
interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: any[];
}

// Define the cache interface
interface Cache {
  [key: string]: NFTMetadata;
}

// Define the TTL for cache entries (in seconds)
const TTL = 60 * 60; // 1 hour

// Initialize the cache
const cache: Cache = {};

// Function to fetch NFT metadata from IPFS
async function fetchNFTMetadata(ipfsHash: string): Promise<NFTMetadata> {
  try {
    const response = await axios.get(`https://ipfs.io/ipfs/${ipfsHash}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching NFT metadata: ${error}`);
    throw error;
  }
}

// Function to cache NFT metadata
function cacheNFTMetadata(nftId: string, metadata: NFTMetadata) {
  cache[nftId] = metadata;
  setTimeout(() => {
    delete cache[nftId];
  }, TTL * 1000);
}

// Function to get NFT metadata from cache or fetch from IPFS
async function getNFTMetadata(nftId: string, ipfsHash: string): Promise<NFTMetadata> {
  if (cache[nftId]) {
    return cache[nftId];
  } else {
    const metadata = await fetchNFTMetadata(ipfsHash);
    cacheNFTMetadata(nftId, metadata);
    return metadata;
  }
}

// Export the getNFTMetadata function
export { getNFTMetadata };

// Example usage:
// const nftId = '12345';
// const ipfsHash = 'Qm12345';
// getNFTMetadata(nftId, ipfsHash).then((metadata) => console.log(metadata));