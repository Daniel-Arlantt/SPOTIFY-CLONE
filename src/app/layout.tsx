import Header from "../components/Layout/Header";
import Player from "../components/Layout/Player";
import LibraryAside from "../components/Layout/LibraryAside";
import "./globals.css";
import MusicContextProvider from "./context/MusicContextProvider";
import SearchContextProvider from "./context/SearchContextProvider";
import CardsContextProvider from "./context/CardsContextProvider";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Spotify Clon - Daniel Arlantt</title>
        <link rel="icon" href="../../public/images/SpotifyIcon.webp" />
      </Head>
      <body className="relative grid h-screen p-1 gap-2 bg-black">
        <CardsContextProvider>
          <MusicContextProvider>
            <SearchContextProvider>
              <header className="[grid-area:header]">
                <Header />
              </header>

              <aside className="[grid-area:aside] hidden md:flex bg-[#121212] rounded-lg flex-col overflow-y-auto">
                <LibraryAside />
              </aside>

              <main className="[grid-area:main] flex flex-col rounded-lg bg-[#121212] overflow-y-auto">
                {children}
              </main>

              <footer className="[grid-area:player]">
                <Player />
              </footer>
            </SearchContextProvider>
          </MusicContextProvider>
        </CardsContextProvider>
      </body>
    </html>
  );
}
