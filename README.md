# Simple NFT Marketplace
A simple NFT marketplace where users can mint, buy, and sell NFTs, built for artists and collectors.

## Badges
[![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)](https://www.javascript.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## What it does
The Simple NFT Marketplace is a decentralized platform that allows users to create, buy, and sell unique digital assets. It provides a user-friendly interface for artists to mint their own NFTs and for collectors to discover and purchase new pieces. The platform utilizes blockchain technology to ensure secure and transparent transactions.

## Features
* NFT minting: allows artists to create their own unique digital assets
* NFT buying: enables collectors to purchase NFTs from other users
* NFT selling: allows users to sell their own NFTs to other collectors
* User profiles: provides a personalized space for users to showcase their NFT collections
* NFT gallery: displays a curated selection of NFTs available for purchase

## Requirements
* Node.js: 16.14.2
* npm: 8.5.5
* Hardhat: 2.10.1
* Ethers.js: 5.6.0
* React: 18.2.0
* Web3.js: 1.7.4

## Installation
To install the required dependencies, run the following command:
```bash
npm install
```
This will install all the necessary packages, including Hardhat, Ethers.js, React, and Web3.js.

## Usage
To start the development server, run the following command:
```bash
npm run start
```
This will start the React development server, and you can access the application at [http://localhost:3000](http://localhost:3000).

Example usage:
* Mint an NFT: `npx hardhat run scripts/mint-nft.js --network localhost`
* Buy an NFT: `npx hardhat run scripts/buy-nft.js --network localhost`
* Sell an NFT: `npx hardhat run scripts/sell-nft.js --network localhost`

Expected output:
* Minting an NFT will display the transaction hash and the NFT's metadata.
* Buying an NFT will display the transaction hash and the NFT's new owner.
* Selling an NFT will display the transaction hash and the NFT's new price.

## Environment Variables
| Variable | Description |
| --- | --- |
| `REACT_APP_CHAIN_ID` | The ID of the Ethereum chain to connect to |
| `REACT_APP_CHAIN_NAME` | The name of the Ethereum chain to connect to |
| `REACT_APP_RPC_URL` | The URL of the Ethereum RPC node to connect to |
| `REACT_APP_WALLET_ADDRESS` | The Ethereum wallet address to use for transactions |

## Project Structure
```markdown
simple-nft-marketplace/
├── contracts/
│   ├── NFT.sol
│   ├── NFTMarketplace.sol
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── containers/
│   │   ├── index.js
│   │   └── ...
│   └── ...
├── hardhat.config.js
├── package.json
├── README.md
└── ...
```

## Contributing
Contributions are welcome! To contribute to the Simple NFT Marketplace, please fork the repository and submit a pull request with your changes. Make sure to follow the standard professional guidelines for commit messages and code formatting.

## License
The Simple NFT Marketplace is licensed under the MIT License. See [LICENSE](LICENSE) for details.