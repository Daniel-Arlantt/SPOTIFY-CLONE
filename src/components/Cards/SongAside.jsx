"use client";
import { useCard } from "@/app/context/CardsContextProvider";
import { useMusic } from "@/app/context/MusicContextProvider";
import Image from "next/image";

const SongAside = () => {
  const { selectSong } = useMusic();
  const { songs } = useCard();
  return (
    <section className="flex flex-wrap gap-2 w-full pb-10">
      {songs.map((song) => (
        <div
          key={song.id}
          onClick={() => selectSong(song.id)}
          className="hover:bg-[#282828] w-full cursor-pointer pr-2 bg-opacity-70 relative flex items-center overflow-hidden hover:scale-105 transition-transform"
        >
          <Image
            src={song.coverUrl}
            alt={song.title}
            width={70}
            height={70}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="p-2 flex flex-col w-full">
            <h2 className="text-white text-sm font-medium truncate">
              {song.title}
            </h2>
            <p className="text-gray-400 text-xs truncate">{song.artist}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SongAside;
