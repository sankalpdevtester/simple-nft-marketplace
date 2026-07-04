import { NFT } from '../types/NFT';
import { cache } from 'memory-cache';

const TTL = 60 * 1000; // 1 minute

interface NFTListingCache {
  getNFTListing(nftId: string): NFT | null;
  setNFTListing(nftId: string, nft: NFT): void;
  clearNFTListing(nftId: string): void;
}

const nftListingCache: NFTListingCache = {
  getNFTListing(nftId: string): NFT | null {
    const cachedNFT = cache.get(`nft-listing-${nftId}`);
    if (cachedNFT) {
      return cachedNFT;
    }
    return null;
  },

  setNFTListing(nftId: string, nft: NFT): void {
    cache.put(`nft-listing-${nftId}`, nft, TTL);
  },

  clearNFTListing(nftId: string): void {
    cache.del(`nft-listing-${nftId}`);
  },
};

export default nftListingCache;

// Example usage:
// const nftListingCache = require('./nftListingCache');
// const nft = { id: '123', name: 'My NFT' };
// nftListingCache.setNFTListing('123', nft);
// const cachedNFT = nftListingCache.getNFTListing('123');
// console.log(cachedNFT); // { id: '123', name: 'My NFT' }
```
To integrate this new feature with the existing files, you can modify the `src/hooks/useNFTMinting.ts` file to use the `nftListingCache` when fetching NFT listings:
```typescript
import { useState, useEffect } from 'react';
import { NFT } from '../types/NFT';
import nftListingCache from '../utils/nftListingCache';

const useNFTMinting = () => {
  const [nftListings, setNftListings] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNFTListings = async () => {
      setLoading(true);
      const cachedNFTListings = nftListingCache.getNFTListing('all');
      if (cachedNFTListings) {
        setNftListings(cachedNFTListings);
        setLoading(false);
        return;
      }

      // Fetch NFT listings from the API
      const response = await fetch('/api/nft-listings');
      const nftListings = await response.json();
      setNftListings(nftListings);
      nftListingCache.setNFTListing('all', nftListings);
      setLoading(false);
    };

    fetchNFTListings();
  }, []);

  return { nftListings, loading };
};

export default useNFTMinting;
```
Similarly, you can modify the `src/components/NFTBuyForm.tsx` file to use the `nftListingCache` when displaying NFT listings:
```typescript
import React from 'react';
import { NFT } from '../types/NFT';
import nftListingCache from '../utils/nftListingCache';

const NFTBuyForm = () => {
  const [nftListings, setNftListings] = useState<NFT[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  useEffect(() => {
    const fetchNFTListings = async () => {
      const cachedNFTListings = nftListingCache.getNFTListing('all');
      if (cachedNFTListings) {
        setNftListings(cachedNFTListings);
        return;
      }

      // Fetch NFT listings from the API
      const response = await fetch('/api/nft-listings');
      const nftListings = await response.json();
      setNftListings(nftListings);
      nftListingCache.setNFTListing('all', nftListings);
    };

    fetchNFTListings();
  }, []);

  const handleNFTSelection = (nft: NFT) => {
    setSelectedNFT(nft);
  };

  return (
    <div>
      <h2>NFT Buy Form</h2>
      <ul>
        {nftListings.map((nft) => (
          <li key={nft.id}>
            <button onClick={() => handleNFTSelection(nft)}>
              {nft.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedNFT && (
        <div>
          <h3>Selected NFT</h3>
          <p>{selectedNFT.name}</p>
        </div>
      )}
    </div>
  );
};

export default NFTBuyForm;