import { NFTListing } from '../types/NFTListing';
import { cache } from 'memory-cache';

const NFT_LISTING_CACHE_TTL = 60 * 1000; // 1 minute

interface NFTListingCache {
  getNFTListing(nftId: string): NFTListing | null;
  setNFTListing(nftId: string, listing: NFTListing): void;
  clearNFTListing(nftId: string): void;
}

const nftListingCache: NFTListingCache = {
  getNFTListing(nftId: string): NFTListing | null {
    const cachedListing = cache.get(nftId);
    if (cachedListing) {
      return cachedListing;
    }
    return null;
  },

  setNFTListing(nftId: string, listing: NFTListing): void {
    cache.put(nftId, listing, NFT_LISTING_CACHE_TTL);
  },

  clearNFTListing(nftId: string): void {
    cache.del(nftId);
  },
};

export const useNFTListingCache = () => {
  const getNFTListing = async (nftId: string): Promise<NFTListing | null> => {
    const cachedListing = nftListingCache.getNFTListing(nftId);
    if (cachedListing) {
      return cachedListing;
    }
    // If not cached, fetch from API and cache the result
    const response = await fetch(`https://api.example.com/nft/${nftId}`);
    const listing: NFTListing = await response.json();
    nftListingCache.setNFTListing(nftId, listing);
    return listing;
  };

  const clearNFTListingCache = (nftId: string) => {
    nftListingCache.clearNFTListing(nftId);
  };

  return { getNFTListing, clearNFTListingCache };
};

// Example usage:
// const { getNFTListing, clearNFTListingCache } = useNFTListingCache();
// const listing = await getNFTListing('12345');
// console.log(listing);
// clearNFTListingCache('12345');