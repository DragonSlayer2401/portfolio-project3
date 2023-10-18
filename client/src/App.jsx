import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Result from "./pages/Result";

function App() {
  return (
    <>
      <Routes>
        <Route path="/404" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/results" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
