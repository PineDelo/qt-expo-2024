import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layout/root-layout";
import Home from "@/pages/home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ),
    children: [
      {
        path: "",
        element: <Home />,
        id: "Home",
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: "/",
  future: { v7_normalizeFormMethod: true },
});
