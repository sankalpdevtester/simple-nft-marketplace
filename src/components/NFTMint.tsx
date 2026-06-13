import React, { useState } from 'react';
import { ethers } from 'ethers';

interface NFTMintProps {
  account: string;
  provider: ethers.providers.Web3Provider | null;
}

function NFTMint({ account, provider }: NFTMintProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const mintNFT = async () => {
    if (provider) {
      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS as string,
        [
          'function mintNFT(string memory _name, string memory _description, string memory _image) public',
        ],
        provider.getSigner()
      );

      const tx = await contract.mintNFT(name, description, image);
      await tx.wait();
    }
  };

  return (
    <div>
      <h2>Mint NFT</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image"
      />
      <button onClick={mintNFT}>Mint NFT</button>
    </div>
  );
}

export default NFTMint;