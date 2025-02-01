import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      {" "}
      <footer className="bg-[#121212] relative text-gray-400 gap-5 flex-col p-2 px-10 py-16 text-sm justify-center">
        <div className="flex flex-col lg:flex-row lg:justify-between p-3 lg:p-0 gap-4 lg:gap-0">
          <ul>
            <li className="font-bold text-white">Compañia</li>
            <li>Acerda de</li>
            <li>Empleo</li>
            <li>For the Record</li>
          </ul>
          <ul>
            <li className="font-bold text-white">Comunidades</li>
            <li>Para artistas</li>
            <li>Desarrolladores</li>
            <li>Publicidad</li>
            <li>Inversionistas</li>
            <li>Proveedores</li>
          </ul>{" "}
          <ul>
            <li className="font-bold text-white">Enlaces útiles</li>
            <li>Ayuda</li>
            <li>App móvil gratis</li>
          </ul>{" "}
          <ul>
            <li className="font-bold text-white">Planes de Spotify</li>
            <li>Premium Individual</li>
            <li>Premium Duo</li>
            <li>Premium Familiar</li>
            <li>Premium para Estudiantes</li>
            <li>Versión gratuita</li>
          </ul>
          <div className="text-xl text-white items-start flex md:flex-col lg:flex-row md:ml-2 gap-2">
            <button className="bg-[#282828] p-3 rounded-full">
              <FaInstagram />
            </button>
            <button className="bg-[#282828] p-3 rounded-full">
              <FaTwitter />
            </button>
            <button className="bg-[#282828] p-3 rounded-full">
              <FaFacebook />
            </button>
          </div>
        </div>
        <hr className="opacity-40 my-5" />
        <div className="lg:col-span-1">
          <div className="col-span-5 flex flex-col gap-5 lg:flex-row justify-between px-4 ">
            <ul className="flex flex-col lg:flex-row gap-5">
              <li>Legal</li>
              <li>Seguridad y Centro de Privacidad</li>
              <li>Política de Privacidad</li>
              <li>Cookies</li>
              <li>Sobre los anuncios</li>
              <li>Accesibilidad</li>
            </ul>
            <p>2025 SpotiRed</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
