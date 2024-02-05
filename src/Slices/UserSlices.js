import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { notify } from "../alerts/Toastify";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../Authentication";
const initialState = {
    users: [],
    isLoading: false,
    error: false,
}
export const getUsersData = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchingDataRequest());
            const response = await axios.get(`${API_BASE_URL}/users/`);
            const data = response.data;
            dispatch(fetchingDataSuccess(data));
            return data;
        } catch (error) {
            dispatch(fetchingDataFailure(error));
        }
    }
}
export const deleteUserData = (index) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/users/${index}`);
            dispatch(deletingTheUser(index))
            Swal.fire(
                'Deleted!',
                'Your User has been deleted.',
                'success'
            )
        } catch (error) {
            if (error.response) {
                notify(error.response.data.message);
            }
        }
    }
}
export const addUserData = (user) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/`, user);
            let newUser = {
                id: response.data.data,
                name: user.name,
                email: user.email,
                designation: user.designation
            };
            dispatch(addingUser(newUser));
            notify(response.data.message);
        } catch (error) {
            if (error.response) {
                notify(error.response.data.message);
            }
        }
    }
}
export const updateUserData = (id, name, email, designation) => {
    return async (dispatch) => {
        try {
            let details = { name, email, designation };
            const response = await axios.put(`${API_BASE_URL}/users/${id}`, details);
            dispatch(updatingUser({ id: id, details: details }));
            notify(response.data.message);
        } catch (error) {
            if (error.response) {
                notify(error.response.data.message);
            }
        }
    }
}

export const updateUserIdData = (uid, name, email, designation) => {
    return async (dispatch) => {
        try {
            let details = { name, email, designation };
            const response = await axios.put(`${API_BASE_URL}/users/${uid}`, details);
            // console.log('Resource updated successfully.', response.data);
            dispatch(updatingUserbyId({ id: uid, details: details }));
            notify(response.data.message);
        } catch (error) {
            if (error.response) {
                notify(error.response.data.message);
            }
            // console.log('Error updating resource: ' + error.message);
        }
    }
}

// export const getUsersDataId = (email) => {
//     return async (dispatch) => {
//         try {
//             dispatch(fetchingDataRequest());
//             const response = await axios.get(`https://grappler-backend-rest-api-production.up.railway.app/users?email=${email}`);
//             dispatch(fetchingDataIDSuccess(response.data));
//             return response.data.id;
//         } catch (error) {
//             dispatch(fetchingDataFailure(error));
//         }
//     }
// }

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchingDataRequest: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        fetchingDataSuccess: (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
            state.error = false;
        },
        fetchingDataFailure: (state, action) => {
            state.users = [];
            state.isLoading = false;
            state.error = false;
        },
        addingUser: (state, action) => {
            // state.users = action.payload;
            let users = [...state.users];
            users.push(action.payload);
            state.users = users;
        },
        deletingTheUser: (state, action) => {
            const updatedItems = state.users.filter((item, index) => item.id !== action.payload);
            state.users = updatedItems;
        },
        updatingUser: (state, action) => {
            const updatedItems = state.users.map((item) => item.id === action.payload.id ? { ...item, ...action.payload.details } : item);
            state.users = updatedItems;
        },
        updatingUserbyId: (state, action) => {
            const updatedUser = {
                id: action.payload.id,
                name: action.payload.details.name,
                email: action.payload.details.email,
                designation: action.payload.details.designation,
            }
            const updatedUsers = state.users.map(user => {
                if (user.id === updatedUser.id) {
                    // If the user id matches the updated user's id, update the user
                    return updatedUser;
                }
                return user; // Return the original user if it doesn't match
            });

            return {
                ...state,
                users: updatedUsers,
            };
        },
        // fetchingDataIDSuccess: (state, action) => {
        //     state.users = action.payload;
        //     state.isLoading = false;
        //     state.error = null;
        // },
    }
})
export const {
    fetchingDataRequest, fetchingDataSuccess, fetchingDataFailure, deletingTheUser, addingUser, updatingUser, updatingUserbyId
} = userSlice.actions;
export default userSlice.reducer;
