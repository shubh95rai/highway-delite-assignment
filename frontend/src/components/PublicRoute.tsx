import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore.tsx";

export default function PublicRoute() {
  const authUser = useAuthStore((state) => state.authUser);

  return authUser ? <Navigate to="/" /> : <Outlet />;
}
