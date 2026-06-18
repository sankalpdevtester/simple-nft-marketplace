import { ethers } from 'ethers';
import { NFTMarketplace } from '../utils/constants';

const getNFTMintingContract = async () => {
  const provider = new ethers.providers.JsonRpcProvider();
  const contract = new ethers.Contract(NFTMarketplace, [
    'function mintNFT(address owner, string name, string description, string image) public',
  ], provider);
  return contract;
};

const getNFTMintingEvents = async () => {
  const contract = await getNFTMintingContract();
  const events = await contract.queryFilter('NFTMinted', {
    fromBlock: 0,
    toBlock: 'latest',
  });
  return events;
};

const getNFTMintingEvent = async (eventId: string) => {
  const events = await getNFTMintingEvents();
  const event = events.find((event) => event.id === eventId);
  return event;
};

export { getNFTMintingContract, getNFTMintingEvents, getNFTMintingEvent };