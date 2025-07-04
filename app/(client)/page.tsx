import BlogSection from "@/components/Bogs/BlogSection";
import HomeCategories from "@/components/Cards-Components/HomeCategories";
import Carousel from "@/components/Carousel/Carousel";
import ProductGrid from "@/components/custom-ui/ProductGrid";
import ShippingContainer from "@/components/ShippingContainer";
const Home = () => {
  return (
    <div className="">
      {/* banner */}
      <Carousel />
      {/* product grid */}
      <ProductGrid />
      {/* Home Cartegories grid */}
      <HomeCategories />
      {/* blog sections */}
      <BlogSection />
      {/* Home Cartegories grid */}
      <ShippingContainer />
    </div>
  );
};

export default Home;
