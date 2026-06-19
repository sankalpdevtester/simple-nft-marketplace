import React from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import { useNFTMarketplace } from '../hooks/useNFTMarketplace';
import { NFTMarketplace } from '../utils/constants';
import { NFTGallery } from './NFTGallery';

const UserProfilePage = ({ address }: { address: string }) => {
  const userProfile = useUserProfile(address);
  const { nftMarketplace } = useNFTMarketplace();

  const handleEditProfile = async () => {
    if (!nftMarketplace) return;
    const userProfileContract = new ethers.Contract(
      NFTMarketplace,
      [
        'function editUserProfile(string, string, string) public',
      ],
      nftMarketplace
    );
    await userProfileContract.editUserProfile(
      'John Doe',
      'This is a bio',
      'https://example.com/profile-picture.jpg'
    );
  };

  return (
    <div>
      <h1>{userProfile.name}</h1>
      <p>{userProfile.bio}</p>
      <img src={userProfile.profilePicture} alt="Profile Picture" />
      <button onClick={handleEditProfile}>Edit Profile</button>
      <NFTGallery nfts={userProfile.nfts} />
    </div>
  );
};

export default UserProfilePage;