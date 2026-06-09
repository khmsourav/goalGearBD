import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import ShopBySport from "@/components/home/ShopBySport";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TopBrands from "@/components/home/TopBrands";
import FlashSale from "@/components/home/FlashSale";
import BestSellers from "@/components/home/BestSellers";
import NewArrivals from "@/components/home/NewArrivals";
import AthleteRecommendations from "@/components/home/AthleteRecommendations";
import CustomerReviews from "@/components/home/CustomerReviews";
import SportsBlog from "@/components/home/SportsBlog";
import MembershipProgram from "@/components/home/MembershipProgram";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <ShopBySport />
        <FeaturedProducts />
        <FlashSale />
        <TopBrands />
        <BestSellers />
        <NewArrivals />
        <AthleteRecommendations />
        <CustomerReviews />
        <SportsBlog />
        <MembershipProgram />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
