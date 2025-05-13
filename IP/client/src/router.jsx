import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import AdminLayout from "./layout/AdminLayout";
import Admin from "./pages/AdminPage";
import ErrorPage from "./pages/ErrorPage";
import AddSnkrPage from "./pages/AddSnkrPage";
import EditSnkrPage from "./pages/EditSnkrPage";

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
    errorElement: <ErrorPage />,
  },
]);

export default router;
