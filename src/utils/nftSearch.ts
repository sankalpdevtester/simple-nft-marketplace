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
  const cachedNFTs = await nftCache.getNFTs();
  const filteredNFTs = cachedNFTs.filter((nft) => {
    const name = nftMetadata.getName(nft);
    const description = nftMetadata.getDescription(nft);
    const query = params.query.toLowerCase();
    return name.toLowerCase().includes(query) || description.toLowerCase().includes(query);
  });

  const sortedNFTs = filteredNFTs.sort((a, b) => {
    const sortBy = params.sortBy;
    const sortOrder = params.sortOrder;
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortBy === 'createdAt') {
      return sortOrder === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
    }
  });

  const limitedNFTs = sortedNFTs.slice(params.offset, params.offset + params.limit);
  return limitedNFTs;
};

const getNFTCount = async (params: SearchParams): Promise<number> => {
  const cachedNFTs = await nftCache.getNFTs();
  const filteredNFTs = cachedNFTs.filter((nft) => {
    const name = nftMetadata.getName(nft);
    const description = nftMetadata.getDescription(nft);
    const query = params.query.toLowerCase();
    return name.toLowerCase().includes(query) || description.toLowerCase().includes(query);
  });
  return filteredNFTs.length;
};

export { searchNFTs, getNFTCount };