import axios from "axios";
import logo from "/spotify-logo.png";

export default function Message({ heading, body }) {

  const handleLogin = () => {
    axios.get("http://localhost:8000/auth/login").then(result => console.log(result))
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-center items-center gap-2">
        <img src={logo} alt="Spotify logo" className="w-14" />
        <h1 className="text-white text-3xl font-bold mb-3">{heading}</h1>
        <p
          className="text-white text-xl text-center mb-5"
          style={{ width: "400px" }}
        >
          {body}
        </p>
        {heading === "Please Login" && (
          <button
            type="button"
            className="text-white rounded-full w-96 p-3 text-3xl"
            style={{ background: "#1eb954" }}
            onClick={() => handleLogin()}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
