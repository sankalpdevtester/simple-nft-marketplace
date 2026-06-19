import { ethers } from 'ethers';
import { NFTMarketplace } from '../utils/constants';

const getUserProfileContract = (nftMarketplace: ethers.Contract) => {
  return new ethers.Contract(
    NFTMarketplace,
    [
      'function getUserProfile(address) view returns (string, string, string, uint256[])',
      'function editUserProfile(string, string, string) public',
    ],
    nftMarketplace
  );
};

const fetchUserProfile = async (address: string, nftMarketplace: ethers.Contract) => {
  const userProfileContract = getUserProfileContract(nftMarketplace);
  const userProfileData = await userProfileContract.getUserProfile(address);
  return {
    name: userProfileData[0],
    bio: userProfileData[1],
    profilePicture: userProfileData[2],
    nfts: userProfileData[3],
  };
};

const editUserProfile = async (
  name: string,
  bio: string,
  profilePicture: string,
  nftMarketplace: ethers.Contract
) => {
  const userProfileContract = getUserProfileContract(nftMarketplace);
  await userProfileContract.editUserProfile(name, bio, profilePicture);
};

export { fetchUserProfile, editUserProfile };