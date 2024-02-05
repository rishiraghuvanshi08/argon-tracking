import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { notify } from "../alerts/Toastify";
import { API_BASE_URL } from "../Authentication";
const initialState = {
    teams: [],
    isLoadingTeam: false,
    teamError: null,
}

export const getUserTeamData = (userId) =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingTeamRequest());
          const response = await axios.get(`${API_BASE_URL}/users/teams/${userId}`);
          dispatch(fetchingTeamSuccess(response.data.data));
        } catch (error) {
          dispatch(fetchingTeamFailure(error));
        }
    }
}


export const getTeamData = () =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingTeamRequest());
          const response = await axios.get(`${API_BASE_URL}/teams/`);
          const data = response.data;
        //   console.log("data here", data);
          dispatch(fetchingTeamSuccess(data));
        } catch (error) {
          dispatch(fetchingTeamFailure(error));
        }
    }
}
export const updateTeamData = (id, name) =>{
    return async(dispatch) =>{
        try {
            let details = { name };
            const response = await axios.put(`${API_BASE_URL}/teams/${id}`, details);
            // console.log('Resource updated successfully.', response.data);
            dispatch(updatingTeam({ id: id, details: details }));
            notify(response.data.message);
          } catch (error) {
            if (error.response) {
                const msg = error.response.data.message;
                notify(msg);
            }
            // console.log('Error updating resource: ' + error.message);
          }
    }
}
export const addTeamData = (teamData) =>{
    return async(dispatch) =>{
        try {
            const response= await axios.post(`${API_BASE_URL}/teams/`, teamData);
            teamData.id=response.data.data
            dispatch(addingTeam(teamData));
            notify(response.data.message);
            dispatch(getTeamData());
          } catch (error) {
            if (error.response) {
                notify(error.response.data.message);
            }
          }
    }
}
const teamSlice = createSlice({
    name : 'teams',
    initialState,
    reducers : {
        fetchingTeamRequest : (state) =>{
            state.isLoadingTeam =  true;
            state.teamError = null;
        },
        fetchingTeamSuccess : (state, action) =>{
            state.teams = action.payload;
            state.isLoadingTeam =  false;
            state.teamError = null;
        },
        fetchingTeamFailure : (state, action) =>{
            state.teams = [];
            state.isLoadingTeam =  false;
            state.teamError = action.payload;
        },
        addingTeam : (state, action) =>{
            let teams = [...state.teams];
            teams.push(action.payload);
            state.teams = teams;
        },
        updatingTeam : (state, action) =>{
            const updatedItems = state.teams.map((item) => item.id === action.payload.id ?
                                                { ...item, ...action.payload.details } : item);
            return {
                ...state,
                teams: updatedItems,
            };
        }
    }
})
export const {
    fetchingTeamRequest, fetchingTeamSuccess, fetchingTeamFailure, deletingTheTeam, updatingTeam, addingTeam
} = teamSlice.actions;
export default teamSlice.reducer;