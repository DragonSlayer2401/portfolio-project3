import { useEffect, useState } from "react";
import axios from "axios"
import SearchIcon from "@mui/icons-material/Search";
import logo from "/spotify-white-logo.png";

export default function Navigation({ authenticated }) {
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    axios.get("http://localhost:8000/auth/status")
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchValue);
  };

  return (
    <header style={{ background: "#1eb954" }} className="flex p-3">
      <img src={logo} alt="Spotify logo" className="w-12" />
      <div className="w-1/2 px-2" style={{ margin: "0 auto" }}>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex justify-center items-center gap-2"
        >
          <SearchIcon
            style={{
              color: "white",
              display: authenticated ? "inline" : "none",
            }}
            sx={{ fontSize: 40 }}
          />
          <input
            type="text"
            placeholder="Search for artist..."
            className="w-full bg-transparent border-b py-2 text-lg text-white"
            onChange={(event) => setSearchValue(event.target.value)}
            style={{ display: authenticated ? "inline" : "none" }}
          />
        </form>
      </div>
    </header>
  );
}
