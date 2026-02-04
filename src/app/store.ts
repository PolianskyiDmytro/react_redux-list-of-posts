import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/usersSlice';
import AuthorReducer from '../features/authorSlice';
import PostsReducer from '../features/postsSlice';
import SelectedPostReducer from '../features/selectedPostSlice';
import CommentsRedurer from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    author: AuthorReducer,
    posts: PostsReducer,
    post: SelectedPostReducer,
    comments: CommentsRedurer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
