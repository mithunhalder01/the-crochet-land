import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import FeaturesStrip from "./components/FeaturesStrip";
import BottomNav from "./components/BottomNav";
import ProductSlider from "./components/ProductSlider";
import PromoBanner from "./components/PromoBanner";
import CategoryGrid from "./components/categoryGrid";
import DiscountSection from "./components/DiscountSection";
import CrochetBanner from "./components/CrochetB";
import NewArrivals from "./components/NewArrivals";
import AboutArtist from "./components/AboutArtist";
import Testimonials from "./components/TestimonialsR";
import HappyCustomers from "./components/gallery";
import CTACard from "./components/CTACard";
import Footer from "./components/Footer";



function App() {
  return (
    <div className="bg-brand-bg min-h-screen text-brand-text">
      <div >
        <Navbar />
        <HeroSlider />
        <FeaturesStrip />
        <ProductSlider />
        <PromoBanner />
        <CategoryGrid />
        <DiscountSection />
        <CrochetBanner />
        <NewArrivals />
        <AboutArtist />
        <Testimonials />
        <HappyCustomers />
        <CTACard />
        <Footer />
        <BottomNav />

      </div>
    </div>
  );
  
}

export default App;
