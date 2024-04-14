import { Dispatch, useState } from "react";
import IdentityTheft from "./IdentityTheft";
import LeftContent from "./LeftContent";
import MarketPlace from "./MarketPlace";
import MessengerAd from "./MessengerAd";
import Music from "./Music";
import Navbar from "./Navbar";
import News from "./News";
import Search from "./Search";
import Services from "./Services";
import WebDirectory from "./WebDirectory";
import { parse } from "path";

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
    setYear(Math.max(parseInt(yearInput), 1215));
  };
  const [yearInput, setYearInput] = useState("");
  const [yearInput2, setYearInput2] = useState("");
  const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setYear(Math.max(parseInt(yearInput2), 1215));
  };
  return (
    <main className="flex justify-center w-[100vw] px-[20%]">
      <div className="w-[100%] h-[100%] flex flex-col">
        <Navbar />
        <Search
          inputVal={yearInput2}
          setInputVal={setYearInput2}
          handleSubmit={handleSubmit2}
        />

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
