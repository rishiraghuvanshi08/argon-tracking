import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { notify } from "../alerts/Toastify";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../Authentication";
const initialState = {
    user: [],
    isLoading: false,
    error: null,
}

export const getUsersDataId = (email) => {
    return async (dispatch) => {
        try {
            dispatch(fetchingDataRequest());
            const response = await axios.get(`${API_BASE_URL}/users?email=${email}`);
            dispatch(fetchingDataIDSuccess(response.data));
            return response.data.id;
        } catch (error) {
            dispatch(fetchingDataFailure(error));
        }
    }
}

const LoginUserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchingDataRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchingDataFailure: (state, action) => {
            state.user = [];
            state.isLoading = false;
            state.error = null;
        },
        fetchingDataIDSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        updatingUserbyId: (state, action) => {
            const updatedUser = {
                id: action.payload.id,
                name: action.payload.details.name,
                email: action.payload.details.email,
                designation: action.payload.details.designation,
            }
            state.user = updatedUser;            
        },
    }
})
export const {
    fetchingDataRequest, fetchingDataFailure, fetchingDataIDSuccess
} = LoginUserSlice.actions;
export default LoginUserSlice.reducer;
