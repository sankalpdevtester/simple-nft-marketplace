import { NFT } from '../types/NFT';
import { cache } from 'memory-cache';

const cacheTTL = 60 * 1000; // 1 minute

interface NFTListingCache {
  [key: string]: NFT[];
}

const nftListingCache: NFTListingCache = {};

const getNFTListingsFromCache = (contractAddress: string): NFT[] | null => {
  const cachedListings = cache.get(contractAddress);
  if (cachedListings) {
    return cachedListings;
  }
  return null;
};

const setNFTListingsInCache = (contractAddress: string, nftListings: NFT[]) => {
  cache.put(contractAddress, nftListings, cacheTTL);
};

const clearNFTListingsFromCache = (contractAddress: string) => {
  cache.del(contractAddress);
};

const getNFTListingCache = () => {
  return nftListingCache;
};

const updateNFTListingCache = (contractAddress: string, nftListings: NFT[]) => {
  nftListingCache[contractAddress] = nftListings;
};

const NFTListingCacheUtils = {
  getNFTListingsFromCache,
  setNFTListingsInCache,
  clearNFTListingsFromCache,
  getNFTListingCache,
  updateNFTListingCache,
};

export default NFTListingCacheUtils;
