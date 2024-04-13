import Navbar from "./components/Navbar";
import Search from "./components/Search";

export default function Home() {
  return (
    <main className="flex justify-center w-[100vw] px-[20%]">
      <div className="w-[100%]">
        <Navbar />
        <Search />
      </div>
    </main>
  );
}
