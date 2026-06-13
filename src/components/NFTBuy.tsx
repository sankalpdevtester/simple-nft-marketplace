import React, { useState } from 'react';
import { ethers } from 'ethers';

interface NFTBuyProps {
  account: string;
  provider: ethers.providers.Web3Provider | null;
}

function NFTBuy({ account, provider }: NFTBuyProps) {
  const [nftId, setNFTId] = useState('');
  const [price, setPrice] = useState('');

  const buyNFT = async () => {
    if (provider) {
      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS as string,
        [
          'function buyNFT(uint256 _nftId) public payable',
        ],
        provider.getSigner()
      );

      const tx = await contract.buyNFT(nftId, {
        value: ethers.utils.parseEther(price),
      });
      await tx.wait();
    }
  };

  return (
    <div>
      <h2>Buy NFT</h2>
      <input
        type="number"
        value={nftId}
        onChange={(e) => setNFTId(e.target.value)}
        placeholder="NFT ID"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <button onClick={buyNFT}>Buy NFT</button>
    </div>
  );
}

export default NFTBuy;