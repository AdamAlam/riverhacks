import { Dispatch, SetStateAction } from "react";

interface Props {
  inputVal: string;
  setInputVal: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
function Search({ inputVal, setInputVal, handleSubmit }: Props) {
  return (
    <div className="bg-search w-[100%] h-[30px] mt-2 border border-slate-600 flex items-center justify-center px-10 py-4">
      <p className="font-bold text-sm mr-2">Search For:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          className="border border-black mr-2"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <select
          name="cars"
          id="cars"
          className="border border-black mr-2 text-md"
        >
          <option value="volvo">On the Web</option>
          <option value="saab">In Images</option>
          <option value="mercedes">In Video</option>
          <option value="audi">In Directory</option>
          <option value="audi">In Local</option>
          <option value="audi">In News</option>
          <option value="audi">In Shopping</option>
        </select>
        <button className="bg-[#efefef] border border-black text-xs p-1 mr-2 rounded-sm">
          Yahoo! Search
        </button>
      </form>
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
