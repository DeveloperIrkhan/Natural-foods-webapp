import ShoppingCartPage from "@/components/shopping-cart/ShoppingCartPage";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const user = await currentUser();
  return (
    <ShoppingCartPage userEmail={user?.emailAddresses[0].emailAddress ?? ""} />
  );
};

export default page;
