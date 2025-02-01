import Footer from "@/components/Layout/Footer";
import Image from "next/image";

const DownloadPage = () => {
  return (
    <section
      className=" overflow-y-scroll overflow-x-hidden max-h-full space-y-3 pb-5 p-3 w-full flex-1 text-white rounded-lg bg-gradient-to-t from-[#121212] to-spotify"
      style={{
        scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
      }}
    >
      <div className="flex flex-col md:flex-row bg-gradient-to-t to-[#121212] from-spotify m-10 p-10">
        <div className="space-y-5">
          <h2 className="font-bold text-3xl">
            Proximamente para Windows y Mac
          </h2>
          <p>
            Disfruta de audio de alta calidad y reproducción en modo offline,
            además de la integración Game Bar de Windows y un feed con la
            actividad de tus amigos que te permite ver lo que tus personas
            favoritas están escuchando en tiempo real.
          </p>
          <button></button>
        </div>

        <Image
          src="/images/downloadPc.png"
          alt="Imagen de descarga para PC"
          width={300}
          height={300}
          priority={true}
          className="w-[50vw] h-auto object-contain drop-shadow-xl"
        />
      </div>
      <Footer />
    </section>
  );
};

export default DownloadPage;
