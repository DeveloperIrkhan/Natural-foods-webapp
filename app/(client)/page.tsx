import HomeCategories from "@/components/Cards-Components/HomeCategories";
import Carousel from "@/components/Carousel/Carousel";
import ProductGrid from "@/components/custom-ui/ProductGrid";
const Home = () => {
  return (
    <div className="">
      {/* banner */}
      <Carousel />
      {/* product grid */}
      <ProductGrid />
      {/* Home Cartegories grid */}
      <HomeCategories />
    </div>
  );
};

export default Home;
