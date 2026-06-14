import React from 'react';
import useNFTMarketplace from '../hooks/useNFTMarketplace';
import NFTMint from './NFTMint';
import NFTBuy from './NFTBuy';
import NFTSell from './NFTSell';
import NFTGallery from './NFTGallery';

const NFTMarketplace = () => {
  const { marketplace, account, nfts, mintNFT, buyNFT, sellNFT, loading } = useNFTMarketplace();

  return (
    <div>
      <h1>NFT Marketplace</h1>
      <NFTMint mintNFT={mintNFT} />
      <NFTBuy buyNFT={buyNFT} nfts={nfts} />
      <NFTSell sellNFT={sellNFT} nfts={nfts} />
      <NFTGallery nfts={nfts} />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default NFTMarketplace;