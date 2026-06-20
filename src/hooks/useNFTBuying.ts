import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNFTMarketplace } from './useNFTMarketplace';
import { NFTMarketplace } from '../utils/constants';

const useNFTBuying = () => {
  const [nftToBuy, setNftToBuy] = useState(null);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState(null);
  const { contract } = useNFTMarketplace();

  const buyNFT = async (nftId: number, price: number) => {
    if (!contract) return;
    setBuying(true);
    try {
      const tx = await contract.buyNFT(nftId, {
        value: ethers.utils.parseEther(price.toString()),
      });
      await tx.wait();
      setNftToBuy(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setBuying(false);
    }
  };

  const getNFTToBuy = async (nftId: number) => {
    if (!contract) return;
    try {
      const nft = await contract.getNFT(nftId);
      setNftToBuy(nft);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return { buyNFT, getNFTToBuy, nftToBuy, buying, error };
};

export default useNFTBuying;