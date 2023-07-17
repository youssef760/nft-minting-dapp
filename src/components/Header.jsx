import ethlogo from '../assets/ethlogo.png'
import { connectWallet } from '../Artvault'
import { useGlobalState, truncate } from '../store'

const Header = () => {
    const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <nav className='w-4/5 flex justify-between md:justify-center
    items-center py-4 mx-auto'>
        <div className='flex flex-row justify-start items-center
        md:flex-[0.5] flex-initial cursor-pointer'>
            <img className='w-8 ' src={ethlogo} alt='logo'/>
            <span className='text-white text-2xl ml-2'>ArtVault</span>
        </div>

        <ul className=' md:flex-[0.5] text-white hidden  list-none
        flex-row justify-between items-center flex-initial md:flex'>
            <li className='mx-4 cursor-pointer'>Explore</li>
            <li className='mx-4 cursor-pointer'>Features</li>
            <li className='mx-4 cursor-pointer'>Community</li>
        </ul>
        {connectedAccount ? (
            <button className=' cursor pointer bg-[#e32970] 
            text-white p-1.5 rounded-xl hover:bg-[#c76cb6] 
            hover:shadow-xl hover:shadow-gray-900 ml-20'>
                {truncate(connectedAccount, 4, 4, 11)}
            </button>
        ) : (
            <button className=' cursor pointer bg-[#e32970] 
            text-white p-1.5 rounded-xl hover:bg-[#c76cb6] 
            hover:shadow-xl hover:shadow-gray-900 ml-20'
            onClick={connectWallet}>
                Connect Wallet
            </button>
        )}
    </nav>
  )
}

export default Header