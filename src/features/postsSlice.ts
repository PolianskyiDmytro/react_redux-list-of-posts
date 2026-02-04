import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: true,
  hasError: false,
};

export const fetchPostsAsync = createAsyncThunk(
  'posts/getPosts',
  async (userId: number) => {
    const arr = await getUserPosts(userId);

    return arr;
  },
);

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      return {
        ...state,
        posts: [],
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsAsync.pending, state => {
        return {
          ...state,
          loaded: false,
        };
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        return {
          ...state,
          posts: action.payload,
          loaded: true,
        };
      })
      .addCase(fetchPostsAsync.rejected, state => {
        return {
          ...state,
          hasError: true,
        };
      });
  },
});

export const { clearPosts } = PostsSlice.actions;
export default PostsSlice.reducer;
