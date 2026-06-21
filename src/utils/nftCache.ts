// src/utils/nftCache.ts
import { NFTMetadata } from './nftMetadata';
import { BigNumber } from 'ethers';
import { NFTMarketplace } from '../hooks/useNFTMarketplace';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class NFTCache {
  private cache: { [key: string]: CacheEntry<any> } = {};
  private ttl: number = 60 * 1000; // 1 minute

  getNFTMetadata(nftId: string): NFTMetadata | undefined {
    const cacheKey = `nft-metadata-${nftId}`;
    const cacheEntry = this.cache[cacheKey];
    if (cacheEntry && cacheEntry.expiresAt > Date.now()) {
      return cacheEntry.value as NFTMetadata;
    }
    return undefined;
  }

  setNFTMetadata(nftId: string, metadata: NFTMetadata) {
    const cacheKey = `nft-metadata-${nftId}`;
    this.cache[cacheKey] = {
      value: metadata,
      expiresAt: Date.now() + this.ttl,
    };
  }

  getNFTMarketplaceData(): NFTMarketplace | undefined {
    const cacheKey = 'nft-marketplace-data';
    const cacheEntry = this.cache[cacheKey];
    if (cacheEntry && cacheEntry.expiresAt > Date.now()) {
      return cacheEntry.value as NFTMarketplace;
    }
    return undefined;
  }

  setNFTMarketplaceData(data: NFTMarketplace) {
    const cacheKey = 'nft-marketplace-data';
    this.cache[cacheKey] = {
      value: data,
      expiresAt: Date.now() + this.ttl,
    };
  }

  getNFTPrice(nftId: string): BigNumber | undefined {
    const cacheKey = `nft-price-${nftId}`;
    const cacheEntry = this.cache[cacheKey];
    if (cacheEntry && cacheEntry.expiresAt > Date.now()) {
      return cacheEntry.value as BigNumber;
    }
    return undefined;
  }

  setNFTPrice(nftId: string, price: BigNumber) {
    const cacheKey = `nft-price-${nftId}`;
    this.cache[cacheKey] = {
      value: price,
      expiresAt: Date.now() + this.ttl,
    };
  }
}

const nftCache = new NFTCache();

export { nftCache };
```
```typescript
// src/hooks/useNFTMarketplace.ts (updated)
import { useState, useEffect } from 'react';
import { NFTMarketplace } from '../contracts/NFTMarketplace';
import { nftCache } from '../utils/nftCache';

const useNFTMarketplace = () => {
  const [marketplaceData, setMarketplaceData] = useState<NFTMarketplace | undefined>(undefined);

  useEffect(() => {
    const cachedData = nftCache.getNFTMarketplaceData();
    if (cachedData) {
      setMarketplaceData(cachedData);
    } else {
      // fetch data from contract and cache it
      const fetchData = async () => {
        const data = await NFTMarketplace.getMarketplaceData();
        nftCache.setNFTMarketplaceData(data);
        setMarketplaceData(data);
      };
      fetchData();
    }
  }, []);

  return marketplaceData;
};

export { useNFTMarketplace };
```
```typescript
// src/components/NFTMint.tsx (updated)
import React, { useState } from 'react';
import { NFTMetadata } from '../utils/nftMetadata';
import { nftCache } from '../utils/nftCache';

const NFTMint = () => {
  const [metadata, setMetadata] = useState<NFTMetadata | undefined>(undefined);

  const handleMint = async () => {
    // mint NFT and get metadata
    const mintedMetadata = await mintNFT();
    nftCache.setNFTMetadata(mintedMetadata.id, mintedMetadata);
    setMetadata(mintedMetadata);
  };

  const cachedMetadata = nftCache.getNFTMetadata('123'); // example nft id
  if (cachedMetadata) {
    setMetadata(cachedMetadata);
  }

  return (
    <div>
      <button onClick={handleMint}>Mint NFT</button>
      {metadata && <div>NFT Metadata: {metadata.name}</div>}
    </div>
  );
};

export { NFTMint };