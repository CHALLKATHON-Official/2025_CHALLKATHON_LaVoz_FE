import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout/Layout";
import Home from "./Routes/Home";
import Community from "./Routes/community/Community";
import CommunityPost from "./Routes/community/CommunityPost";
import Dashboard from "./Routes/Dashboard";
import Issue from "./Routes/Issue";
import Note from "./Routes/Note";
import Wiki from "./Routes/Wiki";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import MyPage from "./Routes/MyPage";
import Notfound from "./Notfound";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      path: "/",
      children: [
        { element: <Home />, path: "/" },
        {
          path: "/community",
          children: [
            { element: <Community />, index: true },
            { element: <CommunityPost />, path: ":postId" },
          ],
        },
        { element: <Dashboard />, path: "/dashboard" },
        { element: <Issue />, path: "/issue" },
        { element: <Note />, path: "/note" },
        { element: <Wiki />, path: "/wiki" },
        { element: <MyPage />, path: "/mypage" },
      ],
    },
    { element: <Login />, path: "/login" },
    { element: <Signup />, path: "/signup" },
    { element: <Notfound />, path: "/*" },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
