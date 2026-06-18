import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNFTMarketplace } from './useNFTMarketplace';
import { NFTMetadata } from '../utils/nftMetadata';

interface MintNFTParams {
  name: string;
  description: string;
  image: string;
}

const useNFTMinting = () => {
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState(null);
  const { contract } = useNFTMarketplace();

  const mintNFT = async (params: MintNFTParams) => {
    setMinting(true);
    try {
      const metadata = await NFTMetadata.createMetadata(params);
      const tx = await contract.mintNFT(metadata);
      await tx.wait();
      setMinting(false);
    } catch (error) {
      setError(error);
      setMinting(false);
    }
  };

  return { mintNFT, minting, error };
};

export default useNFTMinting;