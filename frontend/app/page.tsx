"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Search from "./components/Search";

export default function Home() {
  const [year, setYear] = useState<number>(2005);
  const [yearInput, setYearInput] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setYear(parseInt(yearInput));
  };

  return (
    <main className="flex justify-center w-[100vw] px-[20%]">
      <div className="w-[100%]">
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
        <News year={year} />
      </div>
    </main>
  );
}
