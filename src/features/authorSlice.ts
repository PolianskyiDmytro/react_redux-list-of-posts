import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export type AuthorState = User | null;

const initialState: AuthorState = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<AuthorState>) => action.payload,
  },
});

export const { set } = authorSlice.actions;
export default authorSlice.reducer;
