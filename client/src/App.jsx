import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Result from "./pages/Result";

function App() {
  return (
    <>
      <Routes>
        <Route path="/results" element={<Result />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
