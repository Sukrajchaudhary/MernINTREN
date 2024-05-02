import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateBlog,
  getAllBlogs,
  getBlogByid,
  deleteBlog,
  getOwnBlog,
  updateBlog,
} from "./blogAPI";

const initialState = {
  value: 0,
  status: "idle",
  Blog: [],
  error: null,
  isLoading: false,
  isdelete: false,
  isUpdate: false,
};

export const CreateBlogAsync = createAsyncThunk(
  "blog/CreateBlog",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await CreateBlog(formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getAllBlogsAsync = createAsyncThunk(
  "blog/getAllBlogs",
  async ({ filter,pagination }, { rejectWithValue }) => {
    try {
      const response = await getAllBlogs(filter,pagination);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getBlogByidAsync = createAsyncThunk(
  "blog/getBlogByid",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getBlogByid(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getOwnBlogAsync = createAsyncThunk(
  "blog/getOwnBlog",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOwnBlog();

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteBlogAsync = createAsyncThunk(
  "blog/deleteBlog",
  async (id, { rejectWithValue }) => {
    const response = await deleteBlog(id);
    return response.data;
  }
);
export const updateBlogAsync = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, formData }, { rejectWithValue }) => {
    const response = await updateBlog(id, formData);
    return response.data;
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(CreateBlogAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(CreateBlogAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Blog.push(action.payload);
        state.isLoading = false;
      })
      .addCase(CreateBlogAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
        state.isLoading = false;
      })
      //
      .addCase(getAllBlogsAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getAllBlogsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Blog = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllBlogsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
        state.isLoading = false;
      })
      //
      //
      .addCase(getOwnBlogAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getOwnBlogAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Blog = action.payload;
        state.isLoading = false;
      })
      .addCase(getOwnBlogAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
        state.isLoading = false;
      })
      //
      .addCase(getBlogByidAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getBlogByidAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Blog = action.payload;
        state.isLoading = false;
      })
      .addCase(getBlogByidAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
        state.isLoading = false;
      })
      //
      //
      .addCase(deleteBlogAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(deleteBlogAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.Blog.findIndex(
          (blog) => blog._id === action.payload.id
        );
        state.Blog.splice(index, 1);
        state.isLoading = false;
      })
      .addCase(deleteBlogAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
        state.isLoading = false;
      })
      //
      .addCase(updateBlogAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(updateBlogAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.Blog.findIndex(
          (blog) => blog._id === action.payload.id
        );
        state.Blog[index] = action.payload;
        state.isUpdate = true;
        state.isLoading = false;
      })
      .addCase(updateBlogAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
        state.isLoading = false;
      });

    //
  },
});

export const {} = blogSlice.actions;

export const BlogInfo = (state) => state.blog.Blog;
export const errorMessage = (state) => state.blog.error;
export const LoadingStatus = (state) => state.blog.isLoading;
export const AllUserBlogs = (state) => state.blog.Blog;
export const updateStatus = (state) => state.blog.isUpdate;

export default blogSlice.reducer;
