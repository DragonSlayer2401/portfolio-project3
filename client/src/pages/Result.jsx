import { useState } from "react";
import axios from "axios";
import logo from "/spotify-white-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Result() {
  const state = history.state;
  const [results, setResults] = useState(state.usr.data);
  const [searchValue, setSearchValue] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/auth/search", {
        searchValue: searchValue,
      })
      .then((result) => {
        setResults(result.data.data);
        console.log(results);
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
      <section className="text-white text-2xl flex flex-col justify-center h-screen gap-10">
        <div className="flex justify-center items-center">
          <div>
              <h1 style={{width:"118.71px"}} className="border-b h-fit mr-10">
                Artists <ArrowForwardIcon fontSize="large" />
              </h1>
          </div>
          <div className="flex gap-10 w-2/3">
            {results.artists.items.map((artist) => {
              return (
                <a
                  href={artist.external_urls.spotify}
                  key={artist.id}
                  className="w-1/4"
                >
                  <img
                    src={artist.images[0].url}
                    alt="artist image"
                    className="w-full"
                  />
                </a>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <h1 className="border-b h-fit mr-10">
            Albums <ArrowForwardIcon fontSize="large" />
          </h1>
          <div className="flex gap-10 w-2/3">
            {results.albums.items.map((album) => {
              return (
                <a
                  href={album.external_urls.spotify}
                  key={album.id}
                  className="w-1/4"
                >
                  <img
                    src={album.images[0].url}
                    alt="album image"
                    className="w-full"
                  />
                </a>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <h1 style={{width:"118.71px"}} className="border-b h-fit mr-10">
            Songs <ArrowForwardIcon fontSize="large" />
          </h1>
          <div className="flex gap-10 w-2/3">
            {results.tracks.items.map((song) => {
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
                  />
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
