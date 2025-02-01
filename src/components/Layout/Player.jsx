"use client";
import { useRef, useState, useEffect } from "react";
import { useMusic } from "@/app/context/MusicContextProvider";
import {
  FaRegHeart,
  FaHeart,
  FaPlay,
  FaPause,
  FaRandom,
  FaStepBackward,
  FaStepForward,
  FaRedoAlt,
  FaStream,
  FaVolumeUp,
  FaExpand,
  FaVolumeOff,
} from "react-icons/fa";
import Image from "next/image";

const Player = () => {
  const {
    songUrl,
    title,
    artist,
    coverUrl,
    nextSong,
    prevSong,
  } = useMusic();
  const [state, setState] = useState({
    play: false,
    heart: false,
    random: false,
    replay: false,
    vol: false,
  });
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);

  // Manejar reproducción/pausa
  const handleSong = () => {
    setState(prev => ({ ...prev, play: !prev.play }));
    state.play ? audioRef.current.pause() : audioRef.current.play();
  };

  // Actualizar fuente de audio cuando cambia la canción
  useEffect(() => {
    if (audioRef.current && songUrl) {
      audioRef.current.src = songUrl;
      audioRef.current.play();
      setState(prev => ({ ...prev, play: true }));
    }
  }, [songUrl]);

  // Manejar volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Actualizar tiempo y duración
  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => nextSong();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [nextSong]);

  // Formatear tiempo en minutos:segundos
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Manejar cambio en la barra de progreso
  const handleProgressChange = (e) => {
    const newTime = (e.target.value * duration) / 100;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Alternar silencio
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="w-[98%] mb-1 md:mb-0 ml-2 md:ml-0 rounded-lg md:rounded-none md:bottom-0 md:w-full flex items-center justify-between px-3 text-white">
      <audio ref={audioRef}>
        <source src={songUrl} type="audio/mpeg" />
      </audio>

      {/* Información de la canción */}
      <div className="flex items-center gap-2">
        <Image
          src={coverUrl || '/default-cover.jpg'}
          alt={title}
          width={80}
          height={80}
          className="rounded-lg min-w-[80px] min-h-[80px]"
        />
        <div className="text-white">
          <h2 className="font-bold truncate max-w-[150px]">
            {title || "Título no disponible"}
          </h2>
          <h3 className="text-sm text-gray-400 truncate max-w-[150px]">
            {artist || "Artista no disponible"}
          </h3>
        </div>
        <button
          className="ml-2 hidden md:flex text-xl hover:scale-125 transition-transform"
          onClick={() => setState(prev => ({ ...prev, heart: !prev.heart }))}
        >
          {state.heart ? <FaHeart className="text-spotify" /> : <FaRegHeart />}
        </button>
      </div>

      {/* Controles principales */}
      <div className="hidden md:flex flex-col items-center flex-grow max-w-[600px] mx-4">
        <div className="flex items-center gap-5 text-lg mb-2">
          <button
            className={`hover:text-spotify hover:scale-125 transition-transform ${
              state.random ? "text-spotify" : ""
            }`}
            onClick={() => setState(prev => ({ ...prev, random: !prev.random }))}
          >
            <FaRandom />
          </button>
          
          <button
            className="hover:text-spotify hover:scale-125 transition-transform"
            onClick={prevSong}
          >
            <FaStepBackward />
          </button>

          <button
            className="bg-white p-[0.6rem] rounded-full text-black hover:scale-110 transition-transform"
            onClick={handleSong}
          >
            {state.play ? <FaPause /> : <FaPlay />}
          </button>

          <button
            className="hover:text-spotify hover:scale-125 transition-transform"
            onClick={nextSong}
          >
            <FaStepForward />
          </button>

          <button
            className={`hover:text-spotify hover:scale-125 transition-transform ${
              state.replay ? "text-spotify" : ""
            }`}
            onClick={() => setState(prev => ({ ...prev, replay: !prev.replay }))}
          >
            <FaRedoAlt />
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="flex items-center w-full gap-2 text-sm">
          <span className="text-gray-400">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleProgressChange}
            className="flex-grow h-1 rounded-lg accent-white hover:accent-spotify cursor-pointer"
          />
          <span className="text-white">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controles de volumen */}
      <div className="hidden md:flex items-center gap-3 w-[200px]">
        <button
          className="hover:text-spotify hover:scale-125 transition-transform"
          onClick={toggleMute}
        >
          {isMuted || volume === 0 ? <FaVolumeOff /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            setVolume(Number(e.target.value));
            setIsMuted(false);
          }}
          className="w-full h-1 bg-gray-600 rounded-lg accent-white hover:accent-spotify cursor-pointer"
        />
      </div>

      {/* Versión móvil */}
      <div className="md:hidden flex items-center gap-4 text-2xl">
        <button onClick={() => setState(prev => ({ ...prev, heart: !prev.heart }))}>
          {state.heart ? <FaHeart className="text-spotify" /> : <FaRegHeart />}
        </button>
        <button onClick={handleSong}>
          {state.play ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  );
};

export default Player;