import { Navigate, Outlet } from "react-router-native";

import { MeQuery } from "../__generated__/graphql";

interface AuthWrapperProps {
  me?: MeQuery["me"];
  children?: React.ReactNode;
}

function AuthWrapper({ me }: AuthWrapperProps) {
  return me ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthWrapper;
