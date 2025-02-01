"use client";
import { useCard } from "@/app/context/CardsContextProvider";
import { useMusic } from "@/app/context/MusicContextProvider";
import { useSearch } from "@/app/context/SearchContextProvider";
import Image from "next/image";

const SongCard = () => {
  const { selectSong } = useMusic(); 
  const {search} = useSearch()
  const {songs} = useCard()

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <section className="flex flex-wrap gap-2 w-full"
    
    >
      {filteredSongs.map((song) => (
        <div
          key={song.id}
          onClick={() => selectSong(song.id)}
          className="hover:bg-[#282828] cursor-pointer p-4 rounded-lg bg-opacity-70 relative flex flex-col  overflow-hidden hover:scale-105 transition-transform gap-2 truncate md:w-[15vw] lg:w-[12.5vw] w-[25vw]"

          
        >
          <Image
            src={song.coverUrl}
            alt={song.title}
            width={150}
            height={150}
            className="w-[19vw] lg:w-[11vw] lg:h-[11vw] object-cover rounded"
          />
          <div>
            <h2 className="text-white text-lg font-medium truncate">
              {song.title}
            </h2>
            <p className="text-gray-400 text-sm ">{song.artist}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SongCard;
