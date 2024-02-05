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
import UserProfile from "./views/examples/UserProfile";
import UserProjects from "./views/examples/UserProjects";
import UserTeams from "./views/examples/UserTeams";

var userRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-yellow",
    component: <UserProfile />,
    layout: "/user",
  },
  {
    path: "/projects",
    name: "Projects",
    icon: "ni ni-bullet-list-67 text-red",
    component: <UserProjects />,
    layout: "/user",
  },
  {
    path: "/teams",
    name: "Teams",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <UserTeams />,
    layout: "/user",
  },
];
export default userRoutes;
