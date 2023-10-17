import Message from "../components/Message";
import Navigation from "../components/Navigation";

export default function NotFound() {
  return (
    <main>
      <Navigation authenticated={true} />
      <Message heading="No Results" body="Please type in a search query to get started..." />
    </main>
  );
}
