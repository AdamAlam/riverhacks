"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Search from "./components/Search";
import LeftContent from "./components/LeftContent";
import axios from "axios";
import HomePage from "./components/HomePage";

export default function Home() {
  const [year, setYear] = useState<number>(2005);

  const [entertainmentHeadlines, setEntertainmentHeadlines] = useState<
    string[]
  >([]);
  const [sportHeadlines, setSportHeadlines] = useState<string[]>([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      const entertainmentData = localStorage.getItem("entertainmentHeadlines");
      const sportsData = localStorage.getItem("sportHeadlines");
      const lastYear = localStorage.getItem("year");

      if (entertainmentData && lastYear === year.toString()) {
        setEntertainmentHeadlines(JSON.parse(entertainmentData));
      } else {
        const res = await axios.get(
          `http://localhost:8000/entertainment/${year}`
        );
        const data = JSON.parse(res.data);
        setEntertainmentHeadlines(data.headlines);
        localStorage.setItem(
          "entertainmentHeadlines",
          JSON.stringify(data.headlines)
        );
        localStorage.setItem("year", year.toString());
      }

      if (sportsData && lastYear === year.toString()) {
        setSportHeadlines(JSON.parse(sportsData));
      } else {
        const res = await axios.get(`http://localhost:8000/sports/${year}`);
        const data = JSON.parse(res.data);
        setSportHeadlines(data.headlines);
        localStorage.setItem("sportHeadlines", JSON.stringify(data.headlines));
        localStorage.setItem("year", year.toString());
      }
    };

    fetchHeadlines();
  }, [year]);

  return (
    <HomePage
      sportHeadlines={sportHeadlines}
      entertainmentHeadlines={entertainmentHeadlines}
      year={year}
      setYear={setYear}
    />
  );
}
