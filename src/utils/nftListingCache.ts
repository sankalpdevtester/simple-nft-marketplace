import { NFTListing } from '../types/NFTListing';
import { cache } from 'memory-cache';

const cacheTTL = 60 * 1000; // 1 minute

const nftListingCache = {
  get: (key: string): NFTListing[] | null => {
    return cache.get(key);
  },
  set: (key: string, value: NFTListing[]) => {
    cache.put(key, value, cacheTTL);
  },
  del: (key: string) => {
    cache.del(key);
  },
};

const getNFTListingsFromCache = async (contractAddress: string): Promise<NFTListing[] | null> => {
  const cacheKey = `nft-listings-${contractAddress}`;
  const cachedListings = nftListingCache.get(cacheKey);
  if (cachedListings) {
    return cachedListings;
  }
  return null;
};

const cacheNFTListings = async (contractAddress: string, listings: NFTListing[]) => {
  const cacheKey = `nft-listings-${contractAddress}`;
  nftListingCache.set(cacheKey, listings);
};

const invalidateNFTListingCache = async (contractAddress: string) => {
  const cacheKey = `nft-listings-${contractAddress}`;
  nftListingCache.del(cacheKey);
};

export {
  getNFTListingsFromCache,
  cacheNFTListings,
  invalidateNFTListingCache,
};
``}

const exampleUsage = async () => {
  const contractAddress = '0x...';
  const listings = await getNFTListingsFromCache(contractAddress);
  if (!listings) {
    // fetch listings from API or contract
    const fetchedListings = await fetchNFTListingsFromAPI(contractAddress);
    cacheNFTListings(contractAddress, fetchedListings);
    return fetchedListings;
  }
  return listings;
};

const fetchNFTListingsFromAPI = async (contractAddress: string): Promise<NFTListing[]> => {
  // implement API call to fetch NFT listings
  // for demonstration purposes, return a mock response
  return [
    {
      id: 1,
      name: 'NFT 1',
      description: 'This is NFT 1',
      price: 1.0,
      owner: '0x...',
    },
    {
      id: 2,
      name: 'NFT 2',
      description: 'This is NFT 2',
      price: 2.0,
      owner: '0x...',
    },
  ];
};

export default exampleUsage;