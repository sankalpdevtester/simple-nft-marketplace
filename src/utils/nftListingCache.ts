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
``}

const exampleUsage = () => {
  const contractAddress = '0x1234567890abcdef';
  const nftListings: NFT[] = [
    {
      id: 1,
      name: 'NFT 1',
      description: 'This is NFT 1',
      image: 'https://example.com/nft1.png',
    },
    {
      id: 2,
      name: 'NFT 2',
      description: 'This is NFT 2',
      image: 'https://example.com/nft2.png',
    },
  ];

  NFTListingCacheUtils.setNFTListingsInCache(contractAddress, nftListings);

  const cachedListings = NFTListingCacheUtils.getNFTListingsFromCache(contractAddress);
  console.log(cachedListings);
};

exampleUsage();