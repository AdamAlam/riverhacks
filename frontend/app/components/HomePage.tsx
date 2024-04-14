import { Dispatch, useState } from "react";
import LeftContent from "./LeftContent";
import Navbar from "./Navbar";
import News from "./News";
import Search from "./Search";
import Music from "./Music";
import MarketPlace from "./MarketPlace";
import IdentityTheft from "./IdentityTheft";
import WebDirectory from "./WebDirectory";
import Services from "./Services";
import MessengerAd from "./MessengerAd";
import { Input } from "@/components/ui/input";

interface Props {
  sportHeadlines: string[];
  entertainmentHeadlines: string[];
  year: number;
  setYear: Dispatch<number>;
}
function HomePage({
  sportHeadlines,
  entertainmentHeadlines,
  year,
  setYear,
}: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setYear(parseInt(yearInput));
  };
  const [yearInput, setYearInput] = useState("");
  return (
    <main className="flex justify-center w-[100vw] px-[20%]">
      <div className="w-[100%] h-[100%] flex flex-col">
        <Navbar />
        <Search />

        <div className="flex">
          <div className="w-[65%] mr-2 pt-2">
            <LeftContent
              headlines={entertainmentHeadlines}
              title="Entertainment"
              year={year}
            />
            <LeftContent
              headlines={sportHeadlines}
              title="Sports"
              year={year}
            />
            <IdentityTheft />
            <WebDirectory />
            <Services />
          </div>
          <div className="w-[35%] pt-2">
            <MessengerAd />
            <News year={year} />
            <Music year={year} />
            <MarketPlace year={year} />
          </div>
        </div>
        <div className="flex justify-center w-[100%]">
          <form onSubmit={handleSubmit}>
            <input
              className="border border-black mr-4 p-1"
              value={yearInput}
              type="number"
              onChange={(e) => setYearInput(e.target.value)}
              placeholder="Change Year"
            />
            <button type="submit" className="border border-black p-1">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
export default HomePage;
