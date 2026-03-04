import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-bold text-gray-500">
        Checking admin access...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.email !== "mithunhalder.dev@gmail.com") {
    return <Navigate to="/" />;
  }

  return children;
}
