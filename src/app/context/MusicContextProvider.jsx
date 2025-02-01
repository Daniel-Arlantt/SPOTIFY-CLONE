"use client";
import { supabase } from "@/supabase/Client";
import React, { createContext, useContext, useState, useEffect } from "react";

export const musicContext = createContext();

export const useMusic = () => {
  const context = useContext(musicContext);
  if (!context)
    throw new Error("useMusic must be used within a MusicContextProvider");
  return context;
};

const MusicContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [songId, setSongId] = useState("");
  const [songUrl, setSongUrl] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);

  // Cargar todas las canciones al montar el componente
  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase
        .from("songsTable")
        .select("id, title, artist, coverUrl, songUrl");

      if (!error) {
        setSongs(data);
      }
    };
    fetchSongs();
  }, []);

  const handleURLs = async (id) => {
    const { data: dataSong, error: errorSong } = await supabase
      .from("songsTable")
      .select("songUrl, coverUrl")
      .eq("id", id);

    if (!errorSong) {
      const songPath = dataSong[0].songUrl;
      const coverPath = dataSong[0].coverUrl;

      const { data: signedUrls, error: signedUrlsError } =
        await supabase.storage
          .from("songsST")
          .createSignedUrls([songPath, coverPath], 60 * 5);

      if (!signedUrlsError) {
        setSongUrl(signedUrls[0].signedUrl);
        setCoverUrl(signedUrls[1].signedUrl);
      }
    }
  };

  const selectSong = async (id) => {
    const index = songs.findIndex((song) => song.id === id);
    if (index === -1) return;

    const { data: songData, error: songError } = await supabase
      .from("songsTable")
      .select("*")
      .eq("id", id)
      .single();

    if (!songError) {
      setCurrentSongIndex(index);
      setTitle(songData.title);
      setArtist(songData.artist);
      setSongId(id);
      handleURLs(id);
    }
  };

  const nextSong = () => {
    if (songs.length === 0) return;
    const newIndex = (currentSongIndex + 1) % songs.length;
    selectSong(songs[newIndex].id);
  };

  const prevSong = () => {
    if (songs.length === 0) return;
    const newIndex =
      currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    selectSong(songs[newIndex].id);
  };

  return (
    <musicContext.Provider
      value={{
        title,
        artist,
        songId,
        songUrl,
        coverUrl,
        selectSong,
        nextSong,
        prevSong,
        currentSongIndex,
        songs,
      }}
    >
      {children}
    </musicContext.Provider>
  );
};

export default MusicContextProvider;
