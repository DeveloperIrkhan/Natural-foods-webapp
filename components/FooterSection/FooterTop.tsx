import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import Container from "../Container";

const FooterTop = () => {
  interface ContactInfoData {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
  }
  const ContactData: ContactInfoData[] = [
    { title: "Visit Us", subtitle: "KPK, PAK", icon: <MapPin /> },
    { title: "Contat Us", subtitle: "+92 333 898 8377", icon: <Phone /> },
    {
      title: "Working Hours",
      subtitle: "Mon - Sat (10:00AM - 11:00PM",
      icon: <Clock />
    },
    {
      title: "Email Us",
      subtitle: "info@khalisfoods.com",
      icon: <Mail />
    }
  ];
  return (
    <Container className="grid grid-cols-2 lg:grid-cols-4 py-3">
      {ContactData.map((item) => (
        <div
          key={item.title}
          className="group flex gap-4 border-b hover:border-gray-900 items-center hoverEffect duration-200"
        >
          <div className="h-5 w-5 text-gray-500 group-hover:text-gray-border-gray-900 duration-300 transition-colors hoverEffect">
            {item.icon}
          </div>
          <div className="flex flex-col text-gray-500 group-hover:text-gray-border-gray-900 transition-colors hover:cursor-pointer hoverEffect">
            <h3 className="font-semibold text-gray-700 group-hover:text-gray-border-gray-900 transition-colors hover:cursor-pointer hoverEffect">
              {item.title}
            </h3>
            <p className="text-gray-500 font-medium group-hover:text-gray-border-gray-900 transition-colors hover:cursor-pointer hoverEffect">
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default FooterTop;
