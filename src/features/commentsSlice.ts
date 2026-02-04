import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

export type AddComment = Omit<Comment, 'id'>;

const initialState: CommentsState = {
  comments: [],
  loaded: true,
  hasError: false,
};

export const fetchCommentsAsync = createAsyncThunk(
  'comments/getComments',
  async (postId: number) => {
    const arr = await getPostComments(postId);

    return arr;
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
  async (newCommentData: AddComment, { rejectWithValue }) => {
    try {
      const newComment = await createComment(newCommentData);

      return newComment;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsAsync.pending, state => {
        return {
          ...state,
          loaded: false,
        };
      })
      .addCase(fetchCommentsAsync.fulfilled, (state, action) => {
        return {
          ...state,
          comments: action.payload,
          loaded: true,
        };
      })
      .addCase(fetchCommentsAsync.rejected, state => {
        return {
          ...state,
          hasError: true,
          loaded: true,
        };
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(addCommentAsync.rejected, state => {
        return {
          ...state,
          hasError: true,
        };
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        return {
          ...state,
          comments: state.comments.filter(c => c.id !== action.payload),
        };
      })
      .addCase(deleteCommentAsync.rejected, state => {
        return {
          ...state,
          hasError: true,
        };
      });
  },
});

export default CommentsSlice.reducer;
