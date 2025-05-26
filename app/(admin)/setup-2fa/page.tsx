"use client";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
const page = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const router = useRouter();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    axios.post("/api/auth/setup-2fa", { email }).then((res) => {
      setQrCode(res.data.qrCode);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    // Allow only numbers and only one digit per box
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = Array(6).fill("");
    pasted.forEach((char, i) => {
      if (i < 6 && /^\d$/.test(char)) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);
    // Set focus to the last filled input
    const lastIndex = pasted.length - 1;
    if (lastIndex < 6) {
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const verifyOtp = async () => {
    try {
      setIsLoading(true);
      const fullOtp = otp.join("");
      const email = localStorage.getItem("email");
      const res = await axios.post("/api/auth/verify-2fa", {
        email,
        token: fullOtp
      });

      if (res.data.verified) {
        router.push("/dashboard");
      } else {
        alert("Invalid Code");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-lg mx-auto text-center p-4">
      {isLoading && <LoadingScreen />}
      <h1 className="text-xl font-bold mb-4">Set up 2FA</h1>
      {qrCode ? (
        <img src={qrCode} alt="QR Code" className="mx-auto max-w-lg" />
      ) : (
        <p>Loading QR Code...</p>
      )}
      <div className="flex gap-2 mt-4 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el!;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-10 h-12 text-center border border-gray-300 rounded text-lg"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <button onClick={verifyOtp} className="custom-button my-4">
        Verify
      </button>
    </div>
  );
};

export default page;
