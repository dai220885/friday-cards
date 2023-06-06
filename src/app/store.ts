import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import {appReducer} from 'features/App/app.slice';
import {authReducer} from 'features/auth/auth.slice';
import {cardsReducer} from 'features/cards/cards.slice';
import {packsReducer} from 'features/packs/packs.slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    counter: counterReducer,
    auth: authReducer,
    packs: packsReducer,
    cards: cardsReducer
  },
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat()
  // }
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).prepend()
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
