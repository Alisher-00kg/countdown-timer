import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Timer } from "../components/Timer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/countdown",
    element: <Timer />,
  },
]);
