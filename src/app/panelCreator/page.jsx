import UploadForm from "../../components/UploadForm";

const PanelCreator = () => {
  return (
    <section className="text-white p-6 rounded-lg w-full bg-gradient-to-t from-spotify to-[#121212]0 flex-1">
      <h2 className="font-bold text-3xl">Panel del Creador</h2>
      <p className="text-gray-200">Sube las canciones que quieras</p>
      <UploadForm />
    </section>
  );
};

export default PanelCreator;
