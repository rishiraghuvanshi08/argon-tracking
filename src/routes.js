/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Profile from "./views/examples/Profile.js";
import Teams from "./views/examples/Teams";
import Hierarchy from "./views/examples/Hierarchy";
import Users from "./views/examples/Users";
import Projects from "./views/examples/Projects";

var routes = [
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: <Index />,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/hierarchy",
    name: "Hierarchy",
    icon: "fa-solid fa-chart-bar text-blue",
    component: <Hierarchy />,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "fas fa-users text-orange",
    component: <Users />,
    layout: "/admin",
  },
  {
    path: "/projects",
    name: "Projects",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Projects />,
    layout: "/admin",
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: <Login />,
  //   layout: "/auth",
  // },
  {
    path: "/teams",
    name: "Teams",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <Teams />,
    layout: "/admin",
  },
];
export default routes;
