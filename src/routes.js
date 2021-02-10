import { lazy } from "react";

const routesPages = [
  {
    path: "/",
    label: "Home",
    exact: true,
    component: lazy(() =>
      import("./pages/HomePage" /* webpackChunkName: "HomePage"*/)
    ),
    private: false,
    restricted: true,
  },
  {
    path: "/register",
    label: "Register",
    exact: true,
    component: lazy(() =>
      import("./pages/RegisterPage" /* webpackChunkName: "RegisterPage"*/)
    ),
    private: false,
    restricted: true,
  },
  {
    path: "/contacts",
    label: "Contacts",
    exact: true,
    component: lazy(() =>
      import("./pages/ContactsPage" /* webpackChunkName: "ContactsPage"*/)
    ),
    private: true,
    restricted: false,
  },
];

export default routesPages;
