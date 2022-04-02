import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
