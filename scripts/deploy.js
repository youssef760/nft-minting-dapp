const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const base_uri = 'https://ipfs.io/ipfs/QmTWbe9wDns7aqZQNCuWh5PqybGbBF91kngC5Zf8qmCoyg/'
  const Artvault = await ethers.getContractFactory('Artvault')
  const artvault = await Artvault.deploy('Artvault NFT', 'AVT', base_uri)

  await artvault.deployed()

  const address = JSON.stringify({ address: artvault.address }, null, 4)
  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address', artvault.address)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
