import Header from "../components/Layout/Header";
import Player from "../components/Layout/Player";
import LibraryAside from "../components/Layout/LibraryAside";
import "./globals.css";
import MusicContextProvider from "./context/MusicContextProvider";
import SearchContextProvider from "./context/SearchContextProvider";
import CardsContextProvider from "./context/CardsContextProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CardsContextProvider>
      <MusicContextProvider>
        <SearchContextProvider>
          <html lang="en">
            <head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <link rel="icon" href="/images/spotifyIcon.webp" />
              <title>Spotify - Daniel Arlantt</title>
            </head>
            <body className="relative grid h-screen p-1 gap-2 bg-black">
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
            </body>
          </html>
        </SearchContextProvider>
      </MusicContextProvider>
    </CardsContextProvider>
  );
}
