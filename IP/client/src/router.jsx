import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Admin from "./pages/AdminPage";
import ErrorPage from "./pages/ErrorPage";
import AddSnkrPage from "./pages/AddSnkrPage";
import EditSnkrPage from "./pages/EditSnkrPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";

function ProtectAdminPage() {
  const { user, role } = useContext(AuthContext);
  const location = useLocation();

  if (user && role === "customer") {
    return <Navigate to="/" replace />;
  } else if (user && role === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "detail/:id",
        element: <DetailPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        element: <ProtectAdminPage />,
        children: [
          {
            path: "/admin",
            element: <Admin />,
          },
          {
            path: "/add_sneaker",
            element: <AddSnkrPage />,
          },
          {
            path: "/edit_sneaker/:id",
            element: <EditSnkrPage />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
