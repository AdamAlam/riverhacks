"use Client";

import Link from "next/link";

interface Props {
  headlines: string[];
  title: string;
  year: number;
}

interface Headlines {
  headlines: string[];
}

function LeftContent({ headlines, title, year }: Props) {
  return (
    <div className="text-sm w-[100%] border border-[#d5e3fa] mb-2">
      <div className="bg-[#d5e3fa] px-2">
        <p className="font-semibold">{title}</p>
      </div>
      <div className="text-[10px] p-2">
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
export default LeftContent;
