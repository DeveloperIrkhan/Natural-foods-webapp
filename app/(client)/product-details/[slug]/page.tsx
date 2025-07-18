"use client";
import Container from "@/components/Container";
import { useParams } from "next/navigation";
import { useProductsStore } from "@/features/product/productStore";
import PageTitle from "@/components/PageTitle";
import NoItemFounnd from "@/components/NoItemFounnd";
import SamillerCard from "@/components/Cards-Components/SamillerCard";
import ImagesView from "@/components/Details/ImagesView";
import AditionalInfo from "@/components/Details/AditionalInfo";

const Page = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { products } = useProductsStore();
  const product = products.find((item) => item.slug === slug);

  return (
    <Container className="my-3 px-4 sm:px-[5vw] md:px-[7cw] lg:px-[9vw]">
      {product ? (
        <>
          <div className="w-full flex gap-2 flex-col md:flex-row">
            <ImagesView images={product.images} />
            <AditionalInfo product={product} />
          </div>

          <div className="">
            <div className="flex flex-col mt-6 justify-between items-center">
              <PageTitle className="uppercase font-Jost font-light tracking-[7px] text-gray-900">
                you may also like...
              </PageTitle>
            </div>
            <div className="flex items-center gap-5">
              {products
                .filter((item) => item.category === product.category)
                .slice(0, 6)
                .map((samillerItem) => (
                  <div
                    key={samillerItem._id}
                    className="flex justify-center items-center gap-32"
                  >
                    <SamillerCard
                      product={samillerItem}
                      LinkTo={samillerItem.slug}
                    />
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <NoItemFounnd selectedTab={slug} />
      )}
    </Container>
  );
};

export default Page;
