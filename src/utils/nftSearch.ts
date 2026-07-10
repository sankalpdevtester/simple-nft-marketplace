import { NFT } from '../types/NFT';
import { nftMetadata } from './nftMetadata';
import { nftCache } from './nftCache';

interface SearchParams {
  query: string;
  sortBy: 'name' | 'price' | 'createdAt';
  sortOrder: 'asc' | 'desc';
  limit: number;
  offset: number;
}

const searchNFTs = async (params: SearchParams): Promise<NFT[]> => {
  const cacheKey = `nft-search-${params.query}-${params.sortBy}-${params.sortOrder}-${params.limit}-${params.offset}`;
  const cachedResult = await nftCache.get(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }

  const nfts: NFT[] = await nftMetadata.getAllNFTs();
  const filteredNFTs = nfts.filter((nft) => {
    const name = nft.name.toLowerCase();
    const description = nft.description.toLowerCase();
    const query = params.query.toLowerCase();
    return name.includes(query) || description.includes(query);
  });

  const sortedNFTs = filteredNFTs.sort((a, b) => {
    switch (params.sortBy) {
      case 'name':
        return params.sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      case 'price':
        return params.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      case 'createdAt':
        return params.sortOrder === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
      default:
        throw new Error(`Invalid sort by: ${params.sortBy}`);
    }
  });

  const paginatedNFTs = sortedNFTs.slice(params.offset, params.offset + params.limit);
  await nftCache.set(cacheKey, paginatedNFTs);
  return paginatedNFTs;
};

export { searchNFTs };
```
```typescript
// example usage in src/components/NFTBuyForm.tsx
import React, { useState, useEffect } from 'react';
import { searchNFTs } from '../utils/nftSearch';

const NFTBuyForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const params: SearchParams = {
      query: searchQuery,
      sortBy: 'name',
      sortOrder: 'asc',
      limit: 10,
      offset: 0,
    };
    const result = await searchNFTs(params);
    setNFTs(result);
    setLoading(false);
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {nfts.map((nft) => (
            <li key={nft.id}>
              <h2>{nft.name}</h2>
              <p>{nft.description}</p>
              <p>Price: {nft.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NFTBuyForm;