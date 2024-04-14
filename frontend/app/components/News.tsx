"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Headlines {
  headlines: string[];
}

interface Props {
  year: number;
}
function News({ year }: Props) {
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsHeadlines = async () => {
      const newsData = localStorage.getItem("newsHeadlines");
      const lastYear = localStorage.getItem("year");
      if (newsData && lastYear === year.toString()) {
        setHeadlines(JSON.parse(newsData));
      } else {
        const res = await axios.get(`/api/news/${year}`);
        const data = JSON.parse(res.data);
        setHeadlines(data.headlines);
        localStorage.setItem("newsHeadlines", JSON.stringify(data.headlines));
        localStorage.setItem("year", year.toString());
      }
    };
    fetchNewsHeadlines();
  }, [year]);
  return (
    <div className="text-sm w-[100%] border border-[#9574c9] mb-2">
      <div className="bg-[#9574c9] text-white px-2 flex justify-between">
        <p className="font-semibold">In the News</p>
        <p className="text-[10px]">{year}</p>
      </div>
      <div className="text-[10px] bg-[#f1f1fc] p-2">
        <ul className="list-disc list-inside leading-3">
          {headlines?.map((headline, index) => (
            <li key={index}>
              <Link href={`/article/${year}/${encodeURIComponent(headline)}`}>
                {headline}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default News;
