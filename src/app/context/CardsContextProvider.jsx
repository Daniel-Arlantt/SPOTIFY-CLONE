"use client";
import { supabase } from "@/supabase/Client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

export const cardsContext = createContext();

export const useCard = () => {
  const context = useContext(cardsContext);
  if (!context)
    throw new Error("useCard must be used within a CardsContextProvider");
  return context;
};

const CardsContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("songsTable")
          .select("id, title, artist, coverUrl");

        if (error) throw error;

        // Generar URLs firmadas para cada portada
        const paths = data.map((song) => song.coverUrl);
        const { data: signedUrls, error: signedUrlsError } =
          await supabase.storage.from("songsST").createSignedUrls(paths, 60);

        if (signedUrlsError) throw signedUrlsError;

        // Asignar las URLs firmadas a las canciones
        const songsWithCovers = data.map((song, index) => ({
          ...song,
          coverUrl: signedUrls[index]?.signedUrl || "", // Evitar errores si falla alguna URL
        }));

        setSongs(songsWithCovers);
        setLoading(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-40 sweet-loading">
        <ScaleLoader
          color="#1ed760"
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return <cardsContext.Provider value={{songs}}>{children}</cardsContext.Provider>;
};

export default CardsContextProvider;
