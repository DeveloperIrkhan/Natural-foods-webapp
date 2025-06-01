import Carousel from "@/components/Carousel/Carousel";
import ProductGrid from "@/components/custom-ui/ProductGridProductGrid";

const Home = () => {
  return (
    <div className="">
      {/* banner */}
      <Carousel />
      {/* product grid */}
      <ProductGrid />
    </div>
  );
};

export default Home;
