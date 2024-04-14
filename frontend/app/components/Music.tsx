"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  year: number;
}
function Music({ year }: Props) {
  const [music, setMusic] = useState([]);
  useEffect(() => {
    const fetchMusic = async () => {
      const musicData = localStorage.getItem("music");
      const lastYear = localStorage.getItem("year");
      if (musicData && lastYear === year.toString()) {
        setMusic(JSON.parse(musicData));
      } else {
        const res = await axios.get(`http://localhost:8000/music/${year}`);
        const data = JSON.parse(res.data);
        setMusic(data.songs);
        localStorage.setItem("music", JSON.stringify(data.songs));
        localStorage.setItem("year", year.toString());
      }
    };
    fetchMusic();
  }, [year]);

  return (
    <div className="text-sm w-[100%] border border-[#9574c9] mb-2">
      <div className="bg-[#9574c9] text-white px-2 flex justify-between">
        <p className="font-semibold">Popular Hits</p>
        <p className="text-[10px]">{year}</p>
      </div>
      <div className="text-[10px] bg-[#f1f1fc] p-2">
        <ol className="list-decimal list-inside leading-3">
          {music?.map((song, index) => (
            <li key={index}>{song}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
export default Music;
