interface Props {
  year: number;
}
function MarketPlace({ year }: Props) {
  return (
    <div className="text-sm w-[100%] border border-[#9574c9] mb-2">
      <div className="bg-[#9574c9] text-white px-2 flex justify-between">
        <p className="font-semibold">Marketplace</p>
      </div>
      <div className="text-[10px] bg-[#f1f1fc] p-2 divide-y divide-stone-400">
        <div className="flex leading-3 p-1">
          <img src="/camera.gif" className="self-center mr-1" />
          <div>
            <p className="text-blue-800">Yahoo! Shopping - Digital Cameras</p>
            <p>Shop for the latest digital cameras</p>
            <p>- Research, compare, and buy at low prices.</p>
          </div>
        </div>
        <div className="leading-4 p-1">
          <p className="text-blue-800">
            Home Theater and television buying advice
          </p>
          <p>From Yahoo! Shopping and PC World.</p>
        </div>
        <div className="leading-4 p-1">
          <p className="text-blue-800">Yahoo! Merchant Solutions</p>
          <p>Start Selling online today. Save $50.</p>
        </div>{" "}
        <div className="leading-4 p-1">
          <p className="text-blue-800">SBC Yahoo! DSL</p>
          <p>Free activation and installation. Only $26.95/mo for a year.</p>
        </div>{" "}
        <div className="leading-4 p-1">
          <p className="text-blue-800">Yahoo! Music Unlimited</p>
          <p>
            Over 1 million songs. Only $4.99/month -{" "}
            <span className="text-blue-800">Free Trial</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default MarketPlace;
