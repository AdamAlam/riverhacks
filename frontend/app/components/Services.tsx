interface Props {}
function Services({}: Props) {
  return (
    <div className="text-sm w-[100%] border border-[#d5e3fa] mb-2">
      <div className="bg-[#d5e3fa] px-2 flex justify-between">
        <p className="font-semibold">Yahoo! Web Directory</p>
        <p className="font-semibold text-blue-800 text-[11px]">
          {"»"} More Yahoo! Services
        </p>
      </div>
      <div className="text-[10px] p-3">
        <table className="w-[100%] text-blue-800 text-[13px]">
          <tr>
            <td>360</td>
            <td>Calendar</td>
            <td>Education</td>
            <td>Members</td>
          </tr>
          <tr>
            <td>Auctions</td>
            <td>Classifieds</td>
            <td>Greetings</td>
            <td>Pets</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
export default Services;
