import HeroSlider from "../components/HeroSlider";
import ProductSlider from "../components/ProductSlider";
import PromoBanner from "../components/PromoBanner";
import CategoryGrid from "../components/CategoryGrid";
import CrochetBanner from "../components/CrochetB";
import NewArrivals from "../components/NewArrivals";
import AboutArtist from "../components/AboutArtist";
import Testimonials from "../components/TestimonialsR";
import HappyCustomers from "../components/gallery";
import CTACard from "../components/CTACard";



export default function Home() {
  return (
    <>
      <HeroSlider />
      <ProductSlider />
      <PromoBanner />
      <CategoryGrid />
      <CrochetBanner />
      <NewArrivals />
      <AboutArtist />
      <Testimonials />
      <HappyCustomers />
      <CTACard />
    </>
  );
}
