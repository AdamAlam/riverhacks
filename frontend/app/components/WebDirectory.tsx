interface Props {}
function WebDirectory({}: Props) {
  return (
    <div className="text-sm w-[100%] border border-[#d5e3fa] mb-2">
      <div className="bg-[#d5e3fa] px-2 flex justify-between">
        <p className="font-semibold">Yahoo! Web Directory</p>
        <p className="font-semibold text-blue-800 text-[11px]">
          {"»"} More Yahoo! Web Directory
        </p>
      </div>
      <div className="text-[10px] p-3">
        <table className="w-[100%] text-blue-800 text-[13px]">
          <tr>
            <td>Arts</td>
            <td>Culture</td>
            <td>Health</td>
            <td>Reference</td>
          </tr>
          <tr>
            <td>Business</td>
            <td>Education</td>
            <td>News</td>
            <td>Regional</td>
          </tr>
          <tr>
            <td>Computers</td>
            <td>Entertainment</td>
            <td>Recreation</td>
            <td>Science</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
export default WebDirectory;
