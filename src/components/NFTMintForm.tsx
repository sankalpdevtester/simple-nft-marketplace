import React, { useState } from 'react';
import { useNFTMinting } from '../hooks/useNFTMinting';

interface NFTMintFormProps {
  onMint: () => void;
}

const NFTMintForm: React.FC<NFTMintFormProps> = ({ onMint }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const { mintNFT, minting, error } = useNFTMinting();

  const handleMint = async () => {
    try {
      await mintNFT({ name, description, image });
      onMint();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Mint NFT</h2>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <button type="button" onClick={handleMint} disabled={minting}>
          {minting ? 'Minting...' : 'Mint NFT'}
        </button>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </form>
    </div>
  );
};

export default NFTMintForm;