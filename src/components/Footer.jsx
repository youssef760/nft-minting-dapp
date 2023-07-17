import ethlogo from '../assets/ethlogo.png'

const Footer = () => {
  return (
    <div className='w-full flex md:justify-center justify-between
    items-center flex-col p-4 gradient-bg-footer'>
        <div className='w-full flex flex-col justify-between items-center my-4'>
            <div className='flex flex-1 justify-evenly items-center flex-wrap
             sm:mt-0 mt-5 w-full text-white text-base text-center font-bold'>
                <p className='mx-2 cursor-pointer'>Explore</p>
                <p className='mx-2 cursor-pointer'>features</p>
                <p className='mx-2 cursor-pointer'>Community</p>
            </div>
        </div>
        <div className='text-white text-xs'>email: chigarbs1@gmail.com</div>
    </div>
  )
}

export default Footer