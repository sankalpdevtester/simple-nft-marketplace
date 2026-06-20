import React from 'react';
import { useNFTBuying } from '../hooks/useNFTBuying';
import { useNFTMarketplace } from '../hooks/useNFTMarketplace';

const NFTBuyButton = ({ nftId }: { nftId: number }) => {
  const { buyNFT, buying } = useNFTBuying();
  const { contract } = useNFTMarketplace();

  const handleBuy = async () => {
    if (!contract) return;
    await buyNFT(nftId, await contract.getNFT(nftId).price);
  };

  return (
    <button onClick={handleBuy} disabled={buying}>
      {buying ? 'Buying...' : 'Buy NFT'}
    </button>
  );
};

export default NFTBuyButton;