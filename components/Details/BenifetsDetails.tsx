import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface props {
  productName: string;
  description?: string;
}
const BenifetsDetails = ({ productName, description }: props) => {
  const [benefitsText, setBenefitsText] = useState("");
  const [loadingBenefits, setLoadingBenefits] = useState(false);
  useEffect(() => {
    const fetchProductNameDetails = async () => {
      try {
        setLoadingBenefits(true);
        const resp = await axios.post("/api/generate-benefits", {
          productName: productName,
          description: description
        });
        setBenefitsText(resp.data.benefits);
      } catch (error) {
        setBenefitsText("Failed to load benefits.");
        console.log(error);
      } finally {
        setLoadingBenefits(false);
      }
    };
    fetchProductNameDetails();
  }, []);

  return (
    <div>
      <div>
        {loadingBenefits ? (
          <div className="flex gap-1">
            <p className="text-gray-500">Please hold a sec, we are working on it..</p>
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <p className="text-gray-600 whitespace-pre-line">{benefitsText}</p>
        )}
      </div>
    </div>
  );
};

export default BenifetsDetails;
