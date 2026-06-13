import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface NFTGalleryProps {
  account: string;
  provider: ethers.providers.Web3Provider | null;
}

function NFTGallery({ account, provider }: NFTGalleryProps) {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    if (provider) {
      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS as string,
        [
          'function getNFTs() public view returns (uint256[] memory)',
        ],
        provider
      );

      contract.getNFTs().then((nfts) => {
        setNFTs(nfts);
      });
    }
  }, [account, provider]);

  return (
    <div>
      <h2>NFT Gallery</h2>
      {nfts.map((nft) => (
        <div key={nft.toString()}>
          <h3>NFT {nft.toString()}</h3>
        </div>
      ))}
    </div>
  );
}

export default NFTGallery;