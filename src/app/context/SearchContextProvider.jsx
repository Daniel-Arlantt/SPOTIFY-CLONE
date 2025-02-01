"use client";
import React, { createContext, useContext, useState } from "react";

export const searchContext = createContext();

export const useSearch = () => {
  const context = useContext(searchContext);
  if (!context) throw new Error("useSearch must be used within a SearchContextProvider");
  return context;
};

const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  return (
    <searchContext.Provider value={{ search, searcher }}>
      {children}
    </searchContext.Provider>
  );
};

export default SearchContextProvider;