import avatar from '../assets/owner.jpg';
import github from '../assets/github_icon.png'
import twitter from '../assets/twitter_icon.png'
import linkedin from '../assets/linkedIn_icon.png'
import medium from '../assets/medium_icon.png'
import { setAlert, setGlobalState, useGlobalState } from '../store'
import { payToMint } from '../Artvault'

const Hero = () => {
  const [nfts] = useGlobalState('nfts')
  const onMintNFT = async () => {
    setGlobalState('loading', {
      show: true,
      msg: 'Minting new NFT to your account.'
    })

    await payToMint()
      .then(() => setAlert('Minting successful...', 'green'))
      .catch(() => setGlobalState('loading', {show: false, msg: ''}))
  }

  return (
      <div className='flex flex-col justify-center items-center mx-auto py-10 space-y-10'>
        <h1 className='text-white text-5xl font-extrabold text-center'>
          Art Vault:<br />
          <span>Igniting Creative Power</span>
        </h1>
        <p className='text-center text-white text-bold'>
          Unlock and Gather the Trendiest NFTs in Circulation
        </p>
        <button className='bg-[#e32970] text-white px-6 py-2 
        rounded-full hover:bg-[#c76cb6]'
        onClick={onMintNFT}>
          Mint now
        </button>
        <a className='flex justify-center items-center space-x-2 bg-[#000000ad] 
        rounded-full my-4 pr-3 cursor-pointer' 
        href='https://github.com/youssef760?tab=repositories' target="_blank">
          <img src={avatar} alt='Avatar' className='w-18 h-11 object-contain rounded-full'/>
          <div className='flex flex-col text-white space-y-1'>
            <span>0x5f...146a</span>
            <span>Chigar</span>
          </div>
        </a>
        <p className='text-white text-center text-xs'>
          Chigar Youssef, a blockchain developer, is proficient in JavaScript stacks such as<br />
          React. With a keen interest in blockchain technology,<br />
          he actively explores its potential and engages in blockchain development.
        </p>
        <ul className='flex flex-row justify-center space-x-2 items-center'>
          <a href="https://github.com/youssef760" target="_blank" rel="noopener noreferrer" className='bg-white hover:scale-125 transition-all
          duration-75 delay-75 rounded-full mx-2'>
            <img className='w-7' src={github} alt='github'/>
          </a>
          <a href="https://twitter.com/chigarbs1" target="_blank" rel="noopener noreferrer" className='bg-white hover:scale-125 transition-all
          duration-75 delay-75 rounded-full mx-2'>
            <img className='w-7' src={twitter} alt='twitter'/> 
          </a>
          <a href="https://www.linkedin.com/in/youssef-chigar-226b35263/" target="_blank" rel="noopener noreferrer" className='bg-white hover:scale-125 transition-all
          duration-75 delay-75 rounded-full mx-2'>
            <img className='w-7' src={linkedin} alt='linkedin'/> 
          </a>
          <a href="https://medium.com/@chigarbs1" target="_blank" rel="noopener noreferrer" className='bg-white hover:scale-125 transition-all
          duration-75 delay-75 rounded-full mx-2'>
            <img className='w-7' src={medium} alt='medium'/> 
          </a>
        </ul>
        <div className='shadow-xl shadow-black flex justify-center 
        items-center w-10 h-10 rounded-full bg-white cursor-pointer
        p-3 ml-4 text-black hover:bg-[#bd255f] hover:text-white
        transition-all duration-75 delay-100'>
          <span className='text-sm font-bold'>{nfts.length}</span>
        </div>
      </div>
  );
};

export default Hero;
