"use client";
import React from "react";
import { useMusic } from "../../app/context/MusicContextProvider";

const PlaylistCard = ({ song }) => {
  const { setCurrentSong } = useMusic();

  return (
    <div
    onClick={() => setCurrentSong(song)}
      className="rounded-xl bg-[#282828] pr-2 bg-opacity-70 flex h-16 w-64 items-center overflow-hidden hover:scale-105 transition-transform cursor-pointer"
    >
      <img src={song.coverUrl} alt={song.title} className="w-16 h-16 rounded" />
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
    </div>
  );
};

export default PlaylistCard;
