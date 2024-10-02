import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthContextComponent from "./components/context/authContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className=" bg-gray-100 h-screen dark:bg-dark-body transition-all duration-300 ease-linear">
      <AuthContextComponent>
        <App />
      </AuthContextComponent>
    </div>
  </StrictMode>
);
