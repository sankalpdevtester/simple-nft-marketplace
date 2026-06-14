import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { NFTMarketplace } from '../utils/nftMetadata';
import { contractAddress } from '../utils/constants';

const useNFTMarketplace = () => {
  const [marketplace, setMarketplace] = useState<NFTMarketplace | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const marketplaceContract = new ethers.Contract(contractAddress, NFTMarketplace.abi, signer);
      setMarketplace(marketplaceContract);
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
      const nfts = await marketplaceContract.getNFTs();
      setNfts(nfts);
    };
    init();
  }, []);

  const mintNFT = async (metadata: any) => {
    if (!marketplace) return;
    setLoading(true);
    try {
      const tx = await marketplace.mintNFT(metadata);
      await tx.wait();
      const nfts = await marketplace.getNFTs();
      setNfts(nfts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const buyNFT = async (nftId: number) => {
    if (!marketplace) return;
    setLoading(true);
    try {
      const tx = await marketplace.buyNFT(nftId);
      await tx.wait();
      const nfts = await marketplace.getNFTs();
      setNfts(nfts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sellNFT = async (nftId: number, price: number) => {
    if (!marketplace) return;
    setLoading(true);
    try {
      const tx = await marketplace.sellNFT(nftId, price);
      await tx.wait();
      const nfts = await marketplace.getNFTs();
      setNfts(nfts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { marketplace, account, nfts, mintNFT, buyNFT, sellNFT, loading };
};

export default useNFTMarketplace;