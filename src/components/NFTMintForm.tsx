import React, { useState } from 'react';
import { useNFTMint } from '../hooks/useNFTMint';

const NFTMintForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const { mintNFT, minting, minted, error } = useNFTMint();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mintNFT(name, description, image);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <label>
        Image:
        <input type="text" value={image} onChange={(event) => setImage(event.target.value)} />
      </label>
      <button type="submit" disabled={minting}>
        {minting ? 'Minting...' : 'Mint NFT'}
      </button>
      {minted && <p>NFT minted successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default NFTMintForm;