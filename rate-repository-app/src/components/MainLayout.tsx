import { Outlet } from "react-router-native";

import { MeQuery } from "../__generated__/graphql";
import AppBar from "./AppBar";

interface MainLayoutProps {
  me: MeQuery["me"];
}

function MainLayout({ me }: MainLayoutProps) {
  return (
    <>
      <AppBar me={me} />
      <Outlet />
    </>
  );
}

export default MainLayout;
