import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from "react-toastify";
import { API_BASE_URL } from "../Authentication";
const initialState = {
    hierarchy: [],
    isLoadingHeirarchy: false,
    hierarchyError: null,
}

const notify = (msg) => toast(msg);

export const getHeirarchyData = () =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingHierarchyRequest());
          const response = await axios.get(`${API_BASE_URL}/hierarchy/reporting`);
          const data = response.data;
          dispatch(fetchingHierarchySuccess(data));
        } catch (error) {
          dispatch(fetchingHierarchyFailure(error));
        }
    }
}

export const updateHierarchy = (updateRequest) =>{
    return async(dispatch) =>{
        try {
            dispatch(fetchingHierarchyRequest());
            const response = await axios.post(`${API_BASE_URL}/hierarchy/update-reporting-hierarchy`, updateRequest);
            notify(response.data.message);
            dispatch(updateSuccess());
        } catch (error) {
            if(error.response)
            {
                notify(error.response.data.message);
            }
          dispatch(fetchingHierarchyFailure(error));
        }
    }
}

export const getHeirarchyIdData = (index) =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingHierarchyRequest());
          const response = await axios.get(`${API_BASE_URL}/hierarchy/reporting/${index}`);
          const data = response.data;
          dispatch(fetchingHierarchySuccess(data));
        } catch (error) {
          dispatch(fetchingHierarchyFailure(error));
        }
    }
}
const heirarchySlice = createSlice({
    name : 'hierarchy',
    initialState,
    reducers : {
        fetchingHierarchyRequest : (state) =>{
            state.isLoadingHeirarchy = true;
            state.hierarchyError = null;
        },
        fetchingHierarchySuccess : (state, action) =>{
            state.hierarchy = action.payload;
            state.isLoadingHeirarchy = false;
            state.hierarchyError = null;
        },
        fetchingHierarchyFailure : (state, action) =>{
            state.hierarchy = [];
            state.isLoadingHeirarchy = false;
            state.hierarchyError = action.payload;
        },
        updateSuccess : (state, action) =>{
            state.isLoadingHeirarchy = false;
            state.hierarchyError = null;
        }
    }
})
export const {
    fetchingHierarchyRequest, fetchingHierarchySuccess, fetchingHierarchyFailure, updateSuccess
} = heirarchySlice.actions;
export default heirarchySlice.reducer;
  
