interface Props {}
function Navbar({}: Props) {
  return (
    <div className="flex justify-evenly items-center w-[100%] font-nav">
      <div className="w-10 h-10 text-center text-xs">
        <img src="/finance.gif" alt="logo" />
        Finance
      </div>
      <div className="w-10 h-10 text-xs">
        <img src="/music.gif" alt="logo" />
        Music
      </div>
      <div className="w-10 h-10 text-xs">
        <img src="/Shopping.gif" alt="logo" />
        Shopping
      </div>
      <div className="max-w-[150px]">
        <img src="/yahoo-logo.png" alt="logo" />
      </div>
      <div className="w-10 h-10 text-xs">
        <img src="/mail.gif" alt="logo" />
        Mail
      </div>
      <div className="w-10 h-10 text-xs">
        <img src="/My Yahoo!.gif" alt="logo" />
        My Yahoo!
      </div>
      <div className="w-10 h-10 text-xs">
        <img src="/Messenger.gif" alt="logo" />
        Messenger
      </div>
    </div>
  );
}
export default Navbar;
