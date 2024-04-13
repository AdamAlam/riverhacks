interface Props {}
function Search({}: Props) {
  return (
    <div className="bg-search w-[100%] h-[30px] mt-2 border border-slate-600 flex items-center justify-center px-10 py-4">
      <p className="font-bold text-sm mr-2">Search For:</p>
      <input type="text" className="border border-black mr-2" />
      <select name="cars" id="cars" className="border border-black mr-2">
        {/* //TODO: Change these to the values on Yahoo! */}
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <button className="bg-[#efefef] border border-black text-xs p-1 mr-2 rounded-sm">
        Yahoo! Search
      </button>
      <div className="ml-2">
        <ul className="text-[10px] list-disc">
          <li>
            <a href="#" className="text-[#039]">
              Advanced
            </a>
          </li>
          <li>
            <a href="#" className="text-[#039]">
              My Web
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Search;
