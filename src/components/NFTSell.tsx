import React, { useState } from 'react';
import { ethers } from 'ethers';

interface NFTSellProps {
  account: string;
  provider: ethers.providers.Web3Provider | null;
}

function NFTSell({ account, provider }: NFTSellProps) {
  const [nftId, setNFTId] = useState('');
  const [price, setPrice] = useState('');

  const sellNFT = async () => {
    if (provider) {
      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS as string,
        [
          'function sellNFT(uint256 _nftId, uint256 _price) public',
        ],
        provider.getSigner()
      );

      const tx = await contract.sellNFT(nftId, ethers.utils.parseEther(price));
      await tx.wait();
    }
  };

  return (
    <div>
      <h2>Sell NFT</h2>
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
      <button onClick={sellNFT}>Sell NFT</button>
    </div>
  );
}

export default NFTSell;