import Message from "../components/Message";
import logo from "/spotify-white-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NotFound() {
  const [searchValue, setSearchValue] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/auth/search", {
        searchValue: searchValue,
      })
      .then((result) => {
        navigate("/results", { state: result.data });
      });
  };

  return (
    <main>
      <header style={{ background: "#1eb954" }} className="flex p-3">
        <img src={logo} alt="Spotify logo" className="w-12" />
        <div className="w-1/2 px-2" style={{ margin: "0 auto" }}>
          <form onSubmit={(event) => handleSubmit(event)} className="flex justify-center items-center gap-2">
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
      <Message
        heading="No Results"
        body="Please type in a search query to get started..."
      />
    </main>
  );
}
