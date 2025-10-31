import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import FeaturedRFQs from '../components/FeaturedRFQs';
import WhyChoose from '../components/WhyChoose';
import Partners from '../components/Partners';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activePage="home" />
      <Hero />
      <HowItWorks />
      <FeaturedRFQs />
      <WhyChoose />
      <Partners />
      <Footer />
    </div>
  );
}
