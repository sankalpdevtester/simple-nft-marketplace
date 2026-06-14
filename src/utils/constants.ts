export const contractAddress = '0x...'; // replace with actual contract address
export const NFTMarketplace = {
  abi: [
    {
      inputs: [],
      name: 'getNFTs',
      outputs: [
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_metadata',
          type: 'string',
        },
      ],
      name: 'mintNFT',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_nftId',
          type: 'uint256',
        },
      ],
      name: 'buyNFT',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_nftId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_price',
          type: 'uint256',
        },
      ],
      name: 'sellNFT',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
};