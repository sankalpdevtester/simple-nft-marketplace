import { NFT } from '../types/NFT';
import { nftMetadata } from './nftMetadata';
import { nftCache } from './nftCache';

interface SearchParams {
  query: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
}

const searchNFTs = async (params: SearchParams): Promise<NFT[]> => {
  const { query, page, limit, sortBy, sortOrder } = params;
  const cachedNFTs = await nftCache.getNFTs();

  if (!cachedNFTs) {
    const nfts = await nftMetadata.getNFTs();
    await nftCache.setNFTs(nfts);
    return searchNFTs(params);
  }

  const filteredNFTs = cachedNFTs.filter((nft) => {
    const name = nft.name.toLowerCase();
    const description = nft.description.toLowerCase();
    const queryLower = query.toLowerCase();

    return name.includes(queryLower) || description.includes(queryLower);
  });

  const sortedNFTs = filteredNFTs.sort((a, b) => {
    if (sortBy === 'name') {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else if (sortBy === 'price') {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    } else {
      return 0;
    }
  });

  const paginatedNFTs = sortedNFTs.slice((page - 1) * limit, page * limit);

  return paginatedNFTs;
};

const getNFTCount = async (query: string): Promise<number> => {
  const cachedNFTs = await nftCache.getNFTs();

  if (!cachedNFTs) {
    const nfts = await nftMetadata.getNFTs();
    await nftCache.setNFTs(nfts);
    return getNFTCount(query);
  }

  const filteredNFTs = cachedNFTs.filter((nft) => {
    const name = nft.name.toLowerCase();
    const description = nft.description.toLowerCase();
    const queryLower = query.toLowerCase();

    return name.includes(queryLower) || description.includes(queryLower);
  });

  return filteredNFTs.length;
};

export { searchNFTs, getNFTCount };