import React, { useState } from 'react';
import { useNFTBuying } from '../hooks/useNFTBuying';
import { useNFTMarketplace } from '../hooks/useNFTMarketplace';

const NFTBuyForm = () => {
  const [nftId, setNftId] = useState('');
  const [price, setPrice] = useState('');
  const { buyNFT, getNFTToBuy, nftToBuy, buying, error } = useNFTBuying();
  const { contract } = useNFTMarketplace();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contract) return;
    await getNFTToBuy(parseInt(nftId));
  };

  const handleBuy = async () => {
    if (!contract) return;
    await buyNFT(parseInt(nftId), parseFloat(price));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        NFT ID:
        <input type="number" value={nftId} onChange={(event) => setNftId(event.target.value)} />
      </label>
      <button type="submit">Get NFT</button>
      {nftToBuy && (
        <div>
          <p>NFT Name: {nftToBuy.name}</p>
          <p>NFT Description: {nftToBuy.description}</p>
          <p>NFT Price: {nftToBuy.price}</p>
          <label>
            Price:
            <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
          </label>
          <button onClick={handleBuy} disabled={buying}>
            {buying ? 'Buying...' : 'Buy NFT'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </form>
  );
};

export default NFTBuyForm;