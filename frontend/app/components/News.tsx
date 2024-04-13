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
      .get(`http://localhost:8000/generate_headlines/${year}`)
      .then((res) => JSON.parse(res.data))
      .then((data) => setHeadlines(data.headlines))
      .then(() => setLoading(false));
  }, [year]);
  return (
    <div>
      {loading || headlines.length < 1 ? null : (
        <ul>
          {headlines.map((headline, index) => (
            <li key={index}>{headline}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default News;
