import Container from "@/components/Container";
import UserOrder from "@/components/Orders/UserOrder";
import { currentUser } from "@clerk/nextjs/server";
import React, { useEffect } from "react";

const checkout = async () => {
  const user = await currentUser();

  const userInfo = {
    name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
    email: user?.emailAddresses?.[0]?.emailAddress || "",
    contact: "" // Get from req.body if provided
  };

  return (
    <div className="bg-gray-50">
      <Container>
        <div className="w-full h-full py-5 md:py-16">
          <UserOrder
            userId={user?.id}
            name={userInfo.name}
            email={userInfo.email}
            phoneNumber={userInfo.contact}
          />
        </div>
      </Container>
    </div>
  );
};

export default checkout;
