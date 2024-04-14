"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { Progress } from "@/components/ui/progress";

function Article({ params }: { params: { year: number; headline: string } }) {
  const { year, headline } = params;
  const [article, setArticle] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const baseUrl = "http://localhost:8000";
  const encodedTopic = encodeURIComponent(headline);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 700);
    return () => clearTimeout(timer);
  }, []);
  return (
    <main className="flex  justify-center w-[100vw] px-[20%]">
      <div className="w-[100%] h-[100%]">
        <Navbar />
        <div className="flex h-[500px] flex-col">
          {article.length > 0 && imageUrls.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="flex flex-col mt-[25%] items-center">
              <p>Loading</p>
              <Progress value={progress} className="w-[60%]" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
export default Article;
