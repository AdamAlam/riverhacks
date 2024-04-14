"use client";
import { useState } from "react";
import { Input } from "./../../components/ui/input";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation.tsx";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient.tsx";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

interface Props {
  changeYear: (year: string) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}
function LoadingPage({ changeYear, setLoading, loading }: Props) {
  const loadingStates = [
    {
      text: "Getting News",
    },
    {
      text: "Getting Advertisements",
    },
    {
      text: "Getting Sports",
    },
    {
      text: "Getting Music",
    },
  ];

  const [year, setYear] = useState("2005");

  const handleChange = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeYear(year);
    setLoading(true);
  };
  return (
    <BackgroundGradientAnimation>
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={1000}
      />
      <div className="absolute z-50 inset-0 flex flex-col items-center justify-center text-white font-bold px-4  text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Yahoo! Time Capsule
        </p>
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 text-sm">
          Enter a Year to get started
        </p>
        <form className="width-[50%]" onSubmit={handleSubmit}>
          <Input
            className="w-[100%] mt-2 text-black text-center"
            type="number"
            onChange={handleChange}
            value={year}
          />
        </form>
      </div>
    </BackgroundGradientAnimation>
  );
}
export default LoadingPage;
