import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
