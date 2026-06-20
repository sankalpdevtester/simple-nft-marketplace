import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNFTMarketplace } from './useNFTMarketplace';
import { NFTMarketplace } from '../utils/constants';

const useNFTSelling = () => {
  const [nftToSell, setNftToSell] = useState(null);
  const [selling, setSelling] = useState(false);
  const [error, setError] = useState(null);
  const { contract } = useNFTMarketplace();

  const sellNFT = async (nftId: number, price: number) => {
    if (!contract) return;
    setSelling(true);
    try {
      const tx = await contract.sellNFT(nftId, price);
      await tx.wait();
      setNftToSell(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSelling(false);
    }
  };

  const getNFTToSell = async (nftId: number) => {
    if (!contract) return;
    try {
      const nft = await contract.getNFT(nftId);
      setNftToSell(nft);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return { sellNFT, getNFTToSell, nftToSell, selling, error };
};

export default useNFTSelling;