require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('hardhat-deploy');

module.exports = {
  solidity: '0.8.17',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: 'http://localhost:8545',
      chainId: 31337,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};