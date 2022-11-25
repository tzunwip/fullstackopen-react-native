import { Outlet } from "react-router-native";
import AppBar from "./AppBar";

function MainLayout() {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default MainLayout;
