import Header from "./components/Header"
import Hero from "./components/Hero"
import heroImage from './assets/hero.jpg'
import ArtWorks from "./components/ArtWorks"
import Footer from "./components/Footer"
import Alert from "./components/Alert"
import Loading from "./components/Loading"
import { isWalletConnected, loadNfts } from './Artvault'
import { useEffect } from 'react'
import { useGlobalState } from './store'

const App = () => {
  const [nfts] = useGlobalState('nfts')

  useEffect(async () => {
    await isWalletConnected().then(() => console.log('Blockchain Loaded'))
    await loadNfts()
  }, [])

  return (
    <div className="min-h-screen bg-no-repeat bg-cover"
    style={{
      backgroundImage: `url(${heroImage})`,
    }}>
      <Header />
      <Hero />
      <ArtWorks artworks={nfts} />
      <Footer />
      <Alert />
      <Loading />
    </div>
  )
}

export default App
