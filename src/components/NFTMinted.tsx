import React from 'react';
import { useNFTMint } from '../hooks/useNFTMint';
import { getNFTMintingEvent } from '../utils/nftMinting';

const NFTMinted = () => {
  const { minted } = useNFTMint();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (minted) {
      getNFTMintingEvent(minted).then((event) => setEvent(event));
    }
  }, [minted]);

  return (
    <div>
      {event && (
        <div>
          <h2>NFT Minted:</h2>
          <p>Name: {event.name}</p>
          <p>Description: {event.description}</p>
          <p>Image: {event.image}</p>
        </div>
      )}
    </div>
  );
};

export default NFTMinted;