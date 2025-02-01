"use client";
import Image from "next/image";
import { PiHouse, PiLineVerticalBold } from "react-icons/pi";
import { IoSearch, IoLibraryOutline } from "react-icons/io5";
import { BiArchive } from "react-icons/bi";
import { FiArrowDownCircle } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import Link from "next/link";
import { useSearch } from "@/app/context/SearchContextProvider";

const Header = () => {
  const { search, searcher } = useSearch();
  return (
    <div className=" text-gray-400  bg-black flex items-center justify-between pt-1 lg:px-6 px-2 w-full shadow-2xl">
      <Link
        href="/"
        className="hidden lg:block hover:scale-110 transform transition-transform"
      >
        <Image
          src="/images/spotifyLogo.png"
          alt="Spotify Logo"
          width={40}
          height={40}
          priority={true}
        />
      </Link>

      <div className="relative max-w-lg w-full flex gap-2 ">
        <Link
          href="/"
          className="bg-[#282828] p-2 text-3xl rounded-full hover:scale-105  hover:text-white transform transition-transform"
        >
          <PiHouse />
        </Link>

        <button className="absolute top-1/2 -translate-y-1/2 left-[4.2rem] text-2xl hover:scale-110 hover:text-white transform transition-transform">
          <IoSearch />
        </button>

        <input
          type="search"
          value={search}
          onChange={searcher}
          placeholder="¿Qué quieres reproducir?"
          className="bg-[#282828] w-full rounded-full pl-12 pr-16 text-white hover:bg-white hover:bg-opacity-20 hover:border-2 hover:border-white"
        />

        <PiLineVerticalBold className="absolute top-1/2 right-11 transform -translate-y-1/2 text-2xl" />

        <button className="absolute top-1/2 -translate-y-1/2 right-4 hover:scale-110 transform transition-transform text-3xl hover:text-white ">
          <BiArchive />
        </button>
      </div>

      <div className="flex gap-4 text-sm lg:text-lg ">
        <Link
          href="/download"
          className="lg:flex hidden items-center gap-1 font-semibold hover:scale-105 transform transition-transform hover:text-white "
        >
          <FiArrowDownCircle />
          Instalar aplicación
        </Link>

        <Link
          href="/download"
          className="flex items-center gap-1 font-semibold hover:scale-105 transform transition-transform hover:text-white lg:hidden  text-3xl"
        >
          <FiArrowDownCircle />
        </Link>

        <Link
        href="/"
        className="lg:hidden block hover:scale-110 transform transition-transform"
      >
        <Image
          src="/images/spotifyLogo.png"
          alt="Spotify Logo"
          width={40}
          height={40}
          priority={true}
        />
      </Link>
      </div>
    </div>
  );
};

export default Header;
