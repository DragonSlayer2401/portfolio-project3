import Message from "../components/Message";
import Navigation from "../components/Navigation";

export default function Login() {
    return(
        <main>
            <Navigation authenticated={false} />
            <Message heading="Please Login" body="In order to search for artists, tracks, or songs you must login to your Spotify account" />
        </main>
    )
}