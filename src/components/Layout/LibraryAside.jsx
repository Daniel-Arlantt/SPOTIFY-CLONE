import { IoLibraryOutline } from "react-icons/io5";
import SongAside from '../Cards/SongAside'; 


const LibraryAside = () => {
  return (
    <section className="w-full h-screen overflow-y-hidden text-white rounded-lg">
      {/* Título y encabezado */}
      <div className="flex items-center justify-between gap-2 text-xl md:text-2xl px-4 pt-4 font-bold mb-2">
        <div className="flex items-center justify-start gap-2">
          <IoLibraryOutline className="text-4xl" />
          <h2 className="text-lg">Biblioteca</h2>
        </div>
      </div>

      <div
        className="overflow-y-scroll overflow-x-hidden max-h-[93%] space-y-2 pl-4 py-3"
        style={{
          scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
        }}
      >
        <SongAside/>
      </div>
    </section>
  );
};

export default LibraryAside;
