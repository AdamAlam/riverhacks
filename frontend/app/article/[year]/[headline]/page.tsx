"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Image from "next/image";

function Article({ params }: { params: { year: number; headline: string } }) {
  const { year, headline } = params;
  const [article, setArticle] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const baseUrl = "http://localhost:8000";
  const encodedTopic = encodeURIComponent(headline);

  const [articleDate, setArticleDate] = useState("");
  useEffect(() => {
    axios
      .get(`${baseUrl}/elaborate/?topic=${headline}&year=${year}`)
      .then((res) => JSON.parse(res.data))
      .then((data): void => {
        setArticle(data.article);
        setArticleDate(data.date);
      })
      .then(() => {
        return axios.get(
          `http://localhost:8000/get-image?headline=${headline}&year=${year}`
        );
      })
      .then((res) => setImageUrls(res.data));
  }, [year, headline, encodedTopic]);
  return (
    <main className="flex  justify-center w-[100vw] px-[20%]">
      <div className="w-[100%] h-[100%]">
        <Navbar />
        <div className="flex h-[500px] flex-col">
          <div className="mt-3">
            <h1 className="text-2xl">
              <strong>{decodeURIComponent(headline)}</strong>
            </h1>
            <p className="text-[10px] mb-2">{articleDate}</p>
          </div>
          <div className="flex items-center justify-center">
            <img src={imageUrls[0]} />
          </div>

          <p className="mt-4 font-[verdana] text-sm">{article}</p>
        </div>
      </div>
    </main>
  );
}
export default Article;
