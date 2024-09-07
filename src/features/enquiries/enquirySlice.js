import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

export const getEnquiries = createAsyncThunk(
  "enquiry/get-enquiries",
  async (thunkAPI) => {
    try {
      return await enquiryService.getEnquiry();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getEnquiry = createAsyncThunk(
  "enquiry/get-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.getAEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateEnquiries = createAsyncThunk(
  "enquiry/update-enquiries",
  async (enquiry, thunkAPI) => {
    try {
      return await enquiryService.updateEnquiry(enquiry);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteEnquiries = createAsyncThunk(
  "enquiry/delete-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.deleteEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_It");

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.fetchedEnquiryN = action.payload.name;
        state.fetchedEnquiryE = action.payload.email;
        state.fetchedEnquiryM = action.payload.mobile;
        state.fetchedEnquiryC = action.payload.comment;
        state.fetchedEnquiryS = action.payload.status;
      })
      .addCase(getEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEnquiry = action.payload;
      })
      .addCase(updateEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedEnquiry = action.payload;
      })
      .addCase(deleteEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default enquirySlice.reducer;
