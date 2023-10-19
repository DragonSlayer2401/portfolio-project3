import Message from "../components/Message";
import logo from "/spotify-white-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";

export default function Result() {
  const [searchValue, setSearchValue] = useState();
  const [results, setResults] = useState(history.state.artists === undefined ? null : history.state);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/auth/search", {
        searchValue: searchValue,
      })
      .then(async (result) => {
        const data = result.data.data;
        setResults({
          artists: data.artists.items,
          albums: data.albums.items,
          tracks: data.tracks.items,
        });
        history.pushState({
          artists: data.artists.items,
          albums: data.albums.items,
          tracks: data.tracks.items,}
        , "");
      });
  };

  return (
    <main>
      <header style={{ background: "#1eb954" }} className="flex p-3">
        <img src={logo} alt="Spotify logo" className="w-12" />
        <div className="w-1/2 px-2" style={{ margin: "0 auto" }}>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="flex justify-center items-center gap-2"
          >
            <SearchIcon style={{ color: "white" }} sx={{ fontSize: 40 }} />
            <input
              type="text"
              placeholder="Search for artist..."
              className="w-full bg-transparent border-b py-2 text-lg text-white"
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </form>
        </div>
      </header>
      {results === null && (
        <Message
          heading="No Results"
          body="Please type in a search query to get started..."
        />
      )}
      {results && (
        <section className="text-white text-2xl flex flex-col justify-center h-screen gap-10">
          <div className="flex justify-center items-center">
            <div>
              <h1
                style={{ width: "118.71px" }}
                className="border-b h-fit mr-10"
              >
                Artists <ArrowForwardIcon fontSize="large" />
              </h1>
            </div>
            <div className="flex gap-10">
              {results.artists.map((artist) => {
                return (
                  <a
                    href={artist.external_urls.spotify}
                    key={artist.id}
                    className="w-1/4"
                  >
                    {artist.images.length > 0 && (
                      <img
                        src={artist.images[0].url}
                        alt="artist image"
                        style={{ width: "251.16px", height: "251.16px" }}
                      />
                    )}
                    {artist.images.length === 0 && (
                      <div
                        style={{
                          width: "251.16px",
                          height: "251.16px",
                          background: "#d9dad9",
                        }}
                        className="text-center text-black"
                      >
                        {artist.name}
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <h1 className="border-b h-fit mr-10">
              Albums <ArrowForwardIcon fontSize="large" />
            </h1>
            <div className="flex gap-10">
              {results.albums.map((album) => {
                return (
                  <a
                    href={album.external_urls.spotify}
                    key={album.id}
                    className="w-1/4"
                  >
                    {album.images.length > 0 && (
                      <img
                        src={album.images[0].url}
                        alt="album image"
                        className="w-full"
                        style={{ width: "251.16px", height: "251.16px" }}
                      />
                    )}
                    {album.images.length === 0 && (
                      <div
                        style={{
                          width: "251.16px",
                          height: "251.16px",
                          background: "#d9dad9",
                        }}
                        className="text-center text-black"
                      >
                        {album.name}
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <h1 style={{ width: "118.71px" }} className="border-b h-fit mr-10">
              Songs <ArrowForwardIcon fontSize="large" />
            </h1>
            <div className="flex gap-10">
              {results.tracks.map((song) => {
                return (
                  <a
                    href={song.external_urls.spotify}
                    key={song.id}
                    className="w-1/4"
                  >
                    <img
                      src={song.album.images[0].url}
                      alt="song image"
                      className="w-full"
                      style={{ width: "251.16px", height: "251.16px" }}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
