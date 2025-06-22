import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Routes/Home";
import Community from "./Routes/Community";
import Dashboard from "./Routes/Dashboard";
import Issue from "./Routes/Issue";
import Note from "./Routes/Note";
import Wiki from "./Routes/Wiki";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import Notfound from "./Notfound";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      path: "/",
      children: [
        { element: <Home />, path: "/" },
        { element: <Community />, path: "/community" },
        { element: <Dashboard />, path: "/dashboard" },
        { element: <Issue />, path: "/issue" },
        { element: <Note />, path: "/note" },
        { element: <Wiki />, path: "/wiki" },
      ],
    },
    { element: <Login />, path: "/login" },
    { element: <Signup />, path: "/signup" },
    { element: <Notfound />, path: "/*" },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
