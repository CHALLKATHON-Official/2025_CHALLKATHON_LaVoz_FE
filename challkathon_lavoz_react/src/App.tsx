import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout/Layout";
import Community from "./Routes/community/Community";
import CommunityPost from "./Routes/community/CommunityPost";
import Dashboard from "./Routes/Dashboard";
import Note from "./Routes/Note";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import MyPage from "./Routes/MyPage";
import Notfound from "./Notfound";
import AfterSignin from "./Routes/AfterSignin";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      path: "/",
      children: [
        { element: <Note />, path: "/" },
        {
          path: "/community",
          children: [
            { element: <Community />, index: true },
            { element: <CommunityPost />, path: ":postId" },
          ],
        },
        { element: <Dashboard />, path: "/dashboard" },
        { element: <MyPage />, path: "/mypage" },
      ],
    },
    { element: <Login />, path: "/login" },
    { element: <AfterSignin />, path: "/after" },
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
