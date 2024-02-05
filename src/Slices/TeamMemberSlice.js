import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import Swal from "sweetalert2";
import { API_BASE_URL } from "../Authentication";
import { toast } from "react-toastify";
import { getTeamData } from "./TeamSlice";
// import { useSelector } from "react-redux";
const initialState = {
    teamMember: [],
    isLoadingTeamMember: false,
    teamMemberError: false,
}
export const getTeamMemberData = (teamId) =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingTeamMemberRequest());
          const response = await axios.get(`${API_BASE_URL}/team-members/${teamId}`);
          const data = response.data;
        //   console.log("data here", data);
          dispatch(fetchingTeamMemberSuccess(data));
        } catch (error) {
          dispatch(fetchingTeamMemberFailure(error));
        }
    }
}
export const deleteTeamMemberData = (teamId, userId) =>{
    return async(dispatch) =>{
        try {
            const response = await axios.delete(`${API_BASE_URL}/team-members/${teamId}/delete-member/${userId}`);
            // console.log('Resource deleted successfully.', response.data);
            dispatch(deletingTheTeamMember(userId))
            dispatch(getTeamData());
            Swal.fire(
                'Deleted!',
                'Team Member has been deleted.',
                'success'
            )
            
        } catch (error) {
            console.log('Error deleting resource: ' + error.message);
        }
    }
}
export const updateTeamMemberData = (id, name) =>{
    return async(dispatch) =>{
        try {
            let details = { name };
            const response = await axios.put(`${API_BASE_URL}/projects/${id}`, details);
            // console.log('Resource updated successfully.', response.data);
            dispatch(updatingTeamMember({ id: id, details: details }));
          } catch (error) {
            // console.log('Error updating resource: ' + error.message);
          }
    }
}
const notify = (msg) => toast(msg);
export const addTeamMemberData = (teamId, userIds) =>{
    // console.log("team id and user id ", teamId,userIds);
    return async(dispatch, getState) =>{
        try {
            await axios.post(`${API_BASE_URL}/team-members/${teamId}/add-new-members`, userIds);
            const store = getState().userList;   
            dispatch(addingTeamMember({store, userIds}));
            dispatch(getTeamData());
          } catch (error) {
            if (error.response) {
                notify(error.response.data.message);
            }
            console.error('Error storing data:', error);
          }
    }
}
const teamMemberSlice = createSlice({
    name : 'teamMember',
    initialState,
    reducers : {
        fetchingTeamMemberRequest : (state) =>{
            return {
                ...state,
                isLoading: true,
                error: false,
            };
        },
        fetchingTeamMemberSuccess : (state, action) =>{
            // console.log("DATA SUCCESS", action.payload);
            return {
                ...state,
                teamMember : action.payload,
                isLoading: false,
                error: false,
            };
        },
        fetchingTeamMemberFailure : (state, action) =>{
            return {
                ...state,
                teamMember: [],
                isLoading: false,
                error: action.payload,
            };
        },
        addingTeamMember: (state, action) => {
            const { store, userIds } = action.payload;
            let teamMember = [...state.teamMember];
            const newMembers = store.users.filter(user => userIds.includes(user.id));
            teamMember = [...teamMember, ...newMembers];
            state.teamMember = teamMember;
        },
        deletingTheTeamMember : (state, action) =>{
            const updatedItems = state.teamMember.filter((item) => {
                console.log(item.id, " != ", action.payload);
                return item.id != action.payload
            });
            // console.log(updatedItems, "updatedItems");
            return {
                ...state,
                teamMember: updatedItems,
            }
        },
        updatingTeamMember : (state, action) =>{
            const updatedItems = state.teamMember.map((item) => item.id === action.payload.id ? { ...item, ...action.payload.details } : item);
            return {
                ...state,
                teamMember: updatedItems,
            };
        }
    }
})
export const {
    fetchingTeamMemberRequest, fetchingTeamMemberSuccess, fetchingTeamMemberFailure, deletingTheTeamMember, updatingTeamMember, addingTeamMember
} = teamMemberSlice.actions;
export default teamMemberSlice.reducer;
  
