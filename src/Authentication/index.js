// import Swal from 'sweetalert2';
import Swal from 'sweetalert2';
import setAuthToken from './setAuthToken';

// export const API_BASE_URL = "http://localhost:8080";
export const API_BASE_URL = "https://grappler-backend-rest-api-production.up.railway.app";

// isLoggedIn =>
export const IsLoggedIn = () => {
    let data = localStorage.getItem("data");
    if(data != null) {
        const parsedData = JSON.parse(data);
        setAuthToken(parsedData.jwtToken);
        return true;
    }
    else {
        return false;
    }
};
// doLogin => data => set to localstorage
export const DoLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
}
// doLogout => remove from localstorage
export const DoLogout = () => {
    localStorage.removeItem("data");
    setAuthToken();
    Swal.fire(
        'Logout Successful!',
    )
}
// Get currentUser
export const getCurrentUserDetails = () => {
    if(IsLoggedIn) {
        return JSON.parse(localStorage.getItem("data"));
    }
    else {
        return false;
    }
}
