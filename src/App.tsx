import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import NFTMint from './components/NFTMint';
import NFTBuy from './components/NFTBuy';
import NFTSell from './components/NFTSell';
import UserProfile from './components/UserProfile';
import NFTGallery from './components/NFTGallery';

function App() {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState<Web3Provider | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
    }
  };

  return (
    <div>
      <h1>Simple NFT Marketplace</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <NFTMint account={account} provider={provider} />
      <NFTBuy account={account} provider={provider} />
      <NFTSell account={account} provider={provider} />
      <UserProfile account={account} provider={provider} />
      <NFTGallery account={account} provider={provider} />
    </div>
  );
}

export default App;