import Message from "../components/Message";
import logo from "/spotify-white-logo.png";

export default function Login() {
  return (
    <main>
      <header style={{ background: "#1eb954" }} className="flex p-3">
        <img src={logo} alt="Spotify logo" className="w-12" />
      </header>
      <Message heading="Please Login" body="In order to search for artists, tracks, or songs you must login to your Spotify account" />
    </main>
  );
}
