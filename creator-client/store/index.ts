import { configureStore, createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  getEntries: () => [],
});

const store = configureStore({
  reducer: {},
  middleware: [serializableMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
});

const createStore = () => store;

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

const wrapper = createWrapper(createStore, {
  debug: process.env.NODE_ENV !== 'production',
});

export type { RootState, AppDispatch };
export { wrapper };
