import abi from './abis/src/contracts/Artvault.sol/Artvault.json'
import address from './abis/contractAddress.json'
import { getGlobalState, setGlobalState } from './store'
import { ethers } from 'ethers'

const { ethereum } = window
const contractAddress = address.address
const contractAbi = abi.abi
const opensea_uri = `https://testnets.opensea.io/assets/sepolia/${contractAddress}/`

const getEthereumContract = () => {
	// Define a function named getEthereumContract.
	const connectedAccount = getGlobalState('connectedAccount');
	// Get the connected account from the global state.

	if (connectedAccount) {
		// Check if a connected account exists.
		const provider = new ethers.providers.Web3Provider(ethereum);
		// Create an Ethereum provider.
		const signer = provider.getSigner();
		// Get the account associated with the provider.
		const contract = new ethers.Contract(contractAddress, contractAbi, signer);
		// Create an instance of the Ethereum contract.
		return contract;
		// Return the contract instance.
	} else {
		// Execute this block if there is no connected account.
		return getGlobalState('contract');
		// Return the contract from the global state.
	}
};


const isWalletConnected = async () => {
	// Define a function named isWalletConnected.

	try {
		// Start a try-catch block to handle errors.

		if (!ethereum) return alert('Please install Metamask');
		// Check if the `ethereum` object is available, if not, prompt the user to install MetaMask.

		const accounts = await ethereum.request({ method: 'eth_accounts' });
		// Request the connected accounts from the user's wallet using the `eth_accounts` method.

		window.ethereum.on('chainChanged', (chainId) => {
			window.location.reload();
		});
		// Listen for changes in the Ethereum network and reload the page when the chain changes.

		window.ethereum.on('accountsChanged', async () => {
			setGlobalState('connectedAccount', accounts[0]);
			await isWalletConnected();
		});
		// Listen for changes in the connected accounts and update the global state accordingly.

		if (accounts.length) {
			setGlobalState('connectedAccount', accounts[0]);
		} else {
			alert('Please connect wallet.');
			console.log('No accounts found');
		}
		// If there are connected accounts, set the first account as the connected account in the global state.
		// Otherwise, prompt the user to connect a wallet and log an error message.

	} catch (error) {
		reportError(error);
		// If an error occurs, report the error and handle it.
	}
};

const payToMint = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = getEthereumContract()
    const amount = ethers.utils.parseEther('0.001')

    await contract.payToMint({
      from: connectedAccount,
      value: amount._hex,
    })

    window.location.reload()
  } catch (error) {
    reportError(error)
  }
}

const connectWallet = async () => {
	try {
		if (!ethereum) return alert('Please install Metamask')
		const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
	    setGlobalState('connectedAccount', accounts[0])
	} catch(error) {
		reportError(error)
	}
}

const loadNfts = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = getEthereumContract()
    const nfts = await contract.getAllNFTs()

    setGlobalState('nfts', structuredNfts(nfts))
  } catch (error) {
    reportError(error)
  }
}

const structuredNfts = (nfts) =>
  nfts
    .map((nft) => ({
      id: Number(nft.id),
      url: opensea_uri + nft.id,
      buyer: nft.buyer,
      imageURL: nft.imageURL,
      cost: parseInt(nft.cost._hex) / 10 ** 18,
      timestamp: new Date(nft.timestamp.toNumber()).getTime(),
    }))
    .reverse()


const reportError = (error) => {
	console.log(error.message)
	throw new Error('No ethereum object')
}

export { 
  isWalletConnected, 
  connectWallet, 
  payToMint, 
  loadNfts 
}

