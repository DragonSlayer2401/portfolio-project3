import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Result from "./pages/Result";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
