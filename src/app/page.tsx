import Nav from '@/components/Nav'
import ShopTile from '@/components/ShopTile'
import Hero from '@/components/Hero'
import dynamic from 'next/dynamic'
const VideoIntro = dynamic(() => import('@/components/VideoScrub'), { ssr: false })
import TechMarquee from '@/components/TechMarquee'
import TrustedBy from '@/components/TrustedBy'
import Services from '@/components/Services'
import Materials from '@/components/Materials'
import Process from '@/components/Process'
import Portfolio from '@/components/Portfolio'
import Reviews from '@/components/Reviews'
import Pricing from '@/components/Pricing'
import ContactCTA from '@/components/ContactCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      {/* Fixed full-screen video behind everything */}
      <VideoIntro />

      {/* Floating shop tile — fixed bottom right */}
      <ShopTile />

      {/* Site content scrolls over the video */}
      <main className="relative overflow-x-hidden max-w-[2000px] mx-auto" style={{ zIndex: 1 }}>
        {/* Spacer — extra tall on mobile so video plays out fully */}
        <div className="bg-transparent mobile-spacer" style={{ height: '158vh' }} />

        {/* Rest of site has its own background */}
        <div className="bg-[#0A0A0B]">
          <Nav />
          <Hero />
          <TechMarquee />
          <TrustedBy />
          <Services />
          <Materials />
          <Process />
          <Portfolio />
          <Reviews />
          <Pricing />
          <ContactCTA />
          <Footer />
        </div>
      </main>
    </>
  )
}
