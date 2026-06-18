import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { NFTMarketplace } from '../utils/constants';
import { useNFTMarketplace } from './useNFTMarketplace';

const useNFTMint = () => {
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [error, setError] = useState(null);
  const { nftMarketplace } = useNFTMarketplace();

  const mintNFT = async (name: string, description: string, image: string) => {
    setMinting(true);
    try {
      const accounts = await ethers.getSigners();
      const account = accounts[0].address;
      const tx = await nftMarketplace.mintNFT(account, name, description, image);
      await tx.wait();
      setMinted(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setMinting(false);
    }
  };

  return { mintNFT, minting, minted, error };
};

export default useNFTMint;