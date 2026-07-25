import { NFT } from '../types/NFT';
import { nftCache } from './nftCache';
import { nftMetadata } from './nftMetadata';

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
    const name = nft.metadata.name.toLowerCase();
    const description = nft.metadata.description.toLowerCase();
    const query = params.query.toLowerCase();
    return name.includes(query) || description.includes(query);
  });

  const sortedNFTs = filteredNFTs.sort((a, b) => {
    switch (params.sortBy) {
      case 'name':
        return params.sortOrder === 'asc' ? a.metadata.name.localeCompare(b.metadata.name) : b.metadata.name.localeCompare(a.metadata.name);
      case 'price':
        return params.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      case 'createdAt':
        return params.sortOrder === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
      default:
        throw new Error(`Invalid sort by: ${params.sortBy}`);
    }
  });

  const paginatedNFTs = sortedNFTs.slice(params.offset, params.offset + params.limit);
  return paginatedNFTs;
};

const getNFTMetadata = async (nftId: string): Promise<NFT> => {
  const cachedNFT = await nftCache.getNFT(nftId);
  if (cachedNFT) {
    return cachedNFT;
  }
  const metadata = await nftMetadata.getNFTMetadata(nftId);
  const nft: NFT = {
    id: nftId,
    metadata,
    price: 0,
    createdAt: 0,
  };
  await nftCache.cacheNFT(nft);
  return nft;
};

export { searchNFTs, getNFTMetadata };