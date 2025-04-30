import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./layout/AdminLayout";
import Admin from "./pages/Admin";

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
    ],
    errorElement: <div>Oops! There was an error.</div>,
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

export default router;
