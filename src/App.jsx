import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AddNewCategory from "./components/AddNewCategory";

export default function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-category" element={<AddNewCategory />} />
        </Route>
      </Route>
    </Routes>
  );
}
