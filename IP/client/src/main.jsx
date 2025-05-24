import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import AuthContextProvider from "./context/AuthContext";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { StagewiseToolbar } from "@stagewise/toolbar-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthContextProvider>
  </StrictMode>
);

// Initialize toolbar separately
const toolbarConfig = {
  plugins: [], // Add your custom plugins here
};

document.addEventListener('DOMContentLoaded', () => {
  const toolbarRoot = document.createElement('div');
  toolbarRoot.id = 'stagewise-toolbar-root'; // Ensure a unique ID
  document.body.appendChild(toolbarRoot);

  createRoot(toolbarRoot).render(
    <StrictMode>
      <StagewiseToolbar config={toolbarConfig} />
    </StrictMode>
  );
});