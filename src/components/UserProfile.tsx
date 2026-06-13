import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface UserProfileProps {
  account: string;
  provider: ethers.providers.Web3Provider | null;
}

function UserProfile({ account, provider }: UserProfileProps) {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (provider) {
      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS as string,
        [
          'function getUserProfile(address _account) public view returns (string memory, string memory)',
        ],
        provider
      );

      contract.getUserProfile(account).then(([username, bio]) => {
        setUsername(username);
        setBio(bio);
      });
    }
  }, [account, provider]);

  const updateProfile = async () => {
    if (provider) {
      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS as string,
        [
          'function updateProfile(string memory _username, string memory _bio) public',
        ],
        provider.getSigner()
      );

      const tx = await contract.updateProfile(username, bio);
      await tx.wait();
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="text"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
      />
      <button onClick={updateProfile}>Update Profile</button>
    </div>
  );
}

export default UserProfile;