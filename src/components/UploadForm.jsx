"use client";
import React from "react";
import { supabase } from "@/supabase/Client";
import { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);

    try {
      // Validaciones iniciales
      if (!file) throw new Error("Selecciona un archivo de audio");
      if (!cover) throw new Error("Selecciona una imagen de portada");
      if (!title || !artist) throw new Error("Completa todos los campos");

      // Subir canción
      const songPath = `songs/${Date.now()}_${file.name}`;
      const { data: songData, error: songError } = await supabase.storage
        .from("songsST")
        .upload(songPath, file);

      if (songError) throw songError;

      // Subir portada
      const coverPath = `covers/${Date.now()}_${cover.name}`;
      const { data: coverData, error: coverError } = await supabase.storage
        .from("songsST")
        .upload(coverPath, cover);

      if (coverError) throw coverError;

      // Insertar en base de datos
      const { error: dbError } = await supabase.from("songsTable").insert({
        title,
        artist,
        songUrl: songPath,
        coverUrl: coverPath,
      });

      if (dbError) throw dbError;

      alert("¡Subida exitosa!");
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(true);
    }
  };

  return (
    <form
      className="m-5 w-full flex gap-5 items-center flex-col -ml-1 font-semibold justify-center overflow-hidden"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3 mt-5">
        <input
          type="text"
          name="title"
          required
          placeholder="Titulo de la canción"
          className="text-black w-72 p-2 rounded-lg"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          name="artist"
          required
          placeholder="Nombre de los Artistas"
          className="text-black w-72 p-2 rounded-lg"
          onChange={(e) => setArtist(e.target.value)}
        />
      </div>

      <div className="space-y-3 text-center">
        <div className="bg-[#121212] p-5 bg-opacity-80 rounded-lg space-y-4">
          <h2>Sube la canción</h2>
          <input
            type="file"
            name="song"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="bg-[#121212] p-5 rounded-md"
          />
        </div>

        <div className="bg-[#121212] p-5 bg-opacity-80 rounded-lg space-y-4">
          <h2>Imagen de la canción</h2>
          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={(e) => setCover(e.target.files[0])}
            className="bg-[#121212]  p-5 rounded-md"
          />
        </div>
        <button className="bg-black p-2 w-72 rounded-xl hover:scale-105">
          {loading ? "Subir" : "Subiendo..."}
        </button>
      </div>
    </form>
  );
};

export default UploadForm;
