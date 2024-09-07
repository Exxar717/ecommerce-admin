import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogCatService from "./blogCatService";

export const getBlogCats = createAsyncThunk(
  "blogCat/get-blogCats",
  async (thunkAPI) => {
    try {
      return await blogCatService.getBlogCat();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBlogCat = createAsyncThunk(
  "blogCat/get-blogCat",
  async (id, thunkAPI) => {
    try {
      return await blogCatService.getABlogCat(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlogCats = createAsyncThunk(
  "blogCat/create-blogCats",
  async (blogCatData, thunkAPI) => {
    try {
      return await blogCatService.createBlogCat(blogCatData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlogCats = createAsyncThunk(
  "blogCat/update-blogCats",
  async (blogCat, thunkAPI) => {
    try {
      return await blogCatService.updateBlogCat(blogCat);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlogCats = createAsyncThunk(
  "blogCat/delete-blogCat",
  async (id, thunkAPI) => {
    try {
      return await blogCatService.deleteBlogCat(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_It");

const initialState = {
  blogCats: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogCatSlice = createSlice({
  name: "blogCats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCats = action.payload;
      })
      .addCase(getBlogCats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlogCats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogCat = action.payload;
      })
      .addCase(createBlogCats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(getBlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.fetchedBlogCat = action.payload.title;
      })
      .addCase(getBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBlogCats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlogCat = action.payload;
      })
      .addCase(updateBlogCats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBlogCats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlogCat = action.payload;
      })
      .addCase(deleteBlogCats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, ()=> initialState);
  },
});

export default blogCatSlice.reducer;
