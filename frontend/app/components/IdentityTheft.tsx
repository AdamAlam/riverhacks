interface Props {}
function IdentityTheft({}: Props) {
  return (
    <div className="text-sm w-[100%] border border-[#587794] mb-2">
      <div className="bg-[#587794] px-2">
        <p className="font-semibold text-white">Yahoo! Finance</p>
      </div>
      <div className="flex">
        <img src="/id_theft.jpeg" alt="logo" className="self-center mx-2" />
        <div className="flex flex-col items-center justify-center">
          <p className="text-orange-400 ml-3 mb-1">
            Ways to Prevent and Survive Identity Theft
          </p>
          <ul className="list-disc lint-inside text-blue-800">
            <li>How High-Tech Scams Work</li>
            <li>14 Prevention Tips</li>
            <li>How to clean your name</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default IdentityTheft;
