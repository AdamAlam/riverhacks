interface Props {}
function MessengerAd({}: Props) {
  return (
    <div className="text-sm w-[100%] border border-[#90c169] mb-2 flex">
      <div>
        <img src="/img_heart.gif" alt="Messenger Ad" className="self-center" />
      </div>
      <div className="flex flex-col">
        <img src="/hea_world.gif" alt="Messenger Ad" className="self-center" />
        <p className="text-[8px] leading-3 text-blue-800">
          Bring conversations to life with Yahoo! Messenger emoticons.
        </p>
      </div>
    </div>
  );
}
export default MessengerAd;
