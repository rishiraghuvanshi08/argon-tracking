import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import PrivateRoute from './Authentication/PrivateRoute';
// import { DoLogout } from '../Authentication'
// import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import UserLayout from "./layouts/User.js";
// import PrivateRoute from "./Authentication/PrivateRoute";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/auth/login" />}
          />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/*" element={<AuthLayout />} />
          <Route path="/admin" element={<PrivateRoute allowedRoles="ROLE_ADMIN" />} >
            <Route path="*" element={<AdminLayout />} />
          </Route>
          <Route path="/user" element={<PrivateRoute allowedRoles="ROLE_USER" />} >
            <Route path="*" element={<UserLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    // theme="dark"
    />
    </div>
  );
}

export default App;
