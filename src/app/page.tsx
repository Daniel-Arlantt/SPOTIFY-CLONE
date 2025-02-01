"use client";
import Link from "next/link";
import SongCard from "../components/Cards/SongCard";
import SongList from "../components/Cards/SongList";

const Home = () => {
  return (
    <section className="text-white p-6 pr-0 px-8 rounded-lg w-full flex-1 overflow-y-hidden">
      <nav className="flex items-center gap-2 font-semibold mb-5">
        <h2 className="text-2xl font-bold">¡Bienvenido!</h2>

        <Link
          href="/panelCreator"
          className="bg-[#282828] hover:bg-white hover:text-[#121212] p-2 rounded"
        >
          Panel del creador
        </Link>
      </nav>
      <section
        className="overflow-y-scroll overflow-x-hidden max-h-full space-y-3 pb-5 p-3 w-full h-full"
        style={{
          scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
        }}
      >
        <SongList />
        <div className="flex justify-center items-center w-full">
          <SongCard />
        </div>
      </section>
    </section>
  );
};

export default Home;
