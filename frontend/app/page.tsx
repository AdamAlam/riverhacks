"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Search from "./components/Search";
import LeftContent from "./components/LeftContent";
import axios from "axios";

export default function Home() {
  const [year, setYear] = useState<number>(2005);
  const [yearInput, setYearInput] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setYear(parseInt(yearInput));
  };

  const [entertainmentHeadlines, setEntertainmentHeadlines] = useState<
    string[]
  >([]);
  const [sportHeadlines, setSportHeadlines] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/entertainment/${year}`)
      .then((res) => JSON.parse(res.data))
      .then((data) => setEntertainmentHeadlines(data.headlines));

    axios
      .get(`http://localhost:8000/sports/${year}`)
      .then((res) => JSON.parse(res.data))
      .then((data) => setSportHeadlines(data.headlines));
  }, [year]);

  return (
    <main className="flex justify-center w-[100vw] px-[20%]">
      <div className="w-[100%] h-[100%]">
        <Navbar />
        <Search />
        <form onSubmit={handleSubmit}>
          <input
            className="border border-black"
            value={yearInput}
            type="number"
            onChange={(e) => setYearInput(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="flex h-[500px]">
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
          </div>
          <div className="w-[35%] pt-2">
            <News year={year} />
          </div>
        </div>
      </div>
    </main>
  );
}
