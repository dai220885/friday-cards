import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import {AppDispatch, RootState} from 'app/store';
import {toast} from 'react-toastify';
import {isAxiosError} from 'axios';
import {appActions} from 'features/App/app.slice';
type Options = { showGlobalError?: boolean }
export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  promise: () => Promise<T>,
  options?: Options,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { showGlobalError } = options || {}
  const { dispatch, rejectWithValue } = thunkAPI
  // dispatch(appActions.setIsLoading({isLoading: true}))

  try {
    return await promise()
  } catch (e) {

    return rejectWithValue({ error: e, showGlobalError })
    //return rejectWithValue(e)
  }
  // finally {
  //   dispatch(appActions.setIsLoading({isLoading: false}))
  // }
}
