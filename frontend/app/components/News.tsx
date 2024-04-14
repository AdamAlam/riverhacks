"use client";
import axios from "axios";
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
    axios
      .get(`http://localhost:8000/news/${year}?`)
      .then((res) => JSON.parse(res.data))
      .then((data) => setHeadlines(data.headlines))
      .then(() => setLoading(false));
  }, [year]);
  return (
    <div className="text-sm w-[100%] border border-[#9574c9]">
      <div className="bg-[#9574c9] text-white px-2 flex justify-between">
        <p className="font-semibold">In the News</p>
        <p className="text-[10px]">{year}</p>
      </div>
      <div className="text-[10px] bg-[#f1f1fc] p-2">
        <ul className="list-disc list-inside leading-3">
          {headlines?.map((headline, index) => (
            <li key={index}>{headline}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default News;
