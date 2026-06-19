import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNFTMarketplace } from './useNFTMarketplace';
import { NFTMarketplace } from '../utils/constants';

const useUserProfile = (address: string) => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    bio: '',
    profilePicture: '',
    nfts: [],
  });
  const { nftMarketplace } = useNFTMarketplace();

  const fetchUserProfile = async () => {
    if (!nftMarketplace) return;
    const userProfileContract = new ethers.Contract(
      NFTMarketplace,
      [
        'function getUserProfile(address) view returns (string, string, string, uint256[])',
      ],
      nftMarketplace
    );
    const userProfileData = await userProfileContract.getUserProfile(address);
    setUserProfile({
      name: userProfileData[0],
      bio: userProfileData[1],
      profilePicture: userProfileData[2],
      nfts: userProfileData[3],
    });
  };

  useEffect(() => {
    fetchUserProfile();
  }, [address, nftMarketplace]);

  return userProfile;
};

export default useUserProfile;