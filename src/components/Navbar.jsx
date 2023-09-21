import { useSelector } from "react-redux";
import PublicNavbar from "./Navigation/publicNavbar";
import PrivateNavbar from "./Navigation/privateNavbar";
import AdminNavbar from "./Navigation/adminNavbar";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  const state = useSelector((state) => state.users);
  const { userAuth } = state;
  const isAdmin = userAuth.isAdmin;
  return (
    <>
      {!userAuth ? (
        <PublicNavbar />
      ) : userAuth ? (
        <PrivateNavbar />
      ) : (
        isAdmin && <AdminNavbar />
      )}
      <Outlet />
    </>
  );
};

export default Navbar;
