"use client";
import { useCard } from "@/app/context/CardsContextProvider";
import { useMusic } from "@/app/context/MusicContextProvider";
import Image from "next/image";

const SongList = () => {
  const { selectSong } = useMusic(); // Obtén la función selectSong del contexto
  const { songs } = useCard();
  
  return (
    <section className="lg:grid grid-rows-2 grid-flow-col gap-2 overflow-hidden pb-3 hidden p-5">
      {songs.slice(0, 8).map((song) => (
        <div
          key={song.id}
          onClick={() => selectSong(song.id)}
          className="cursor-pointer flex items-center gap-4 bg-[#282828] pr-2 bg-opacity-70 hover:bg-opacity-100 relative overflow-hidden hover:scale-105 transition-transform rounded-md"
        >
          <Image
            src={song.coverUrl}
            alt={song.title}
            width={70}
            height={70}
            className="w-16 h-16 object-cover rounded "
          />
          <h2 className="text-white text-sm md:text-base font-medium truncate">{song.title}</h2>
        </div>
      ))}
    </section>
  );
};

export default SongList;
