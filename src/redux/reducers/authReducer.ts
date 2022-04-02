import {
  LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_USER, START_LOGIN, STOP_LOGIN,
} from '../namespaces';

interface IAction {
  type: string;
  payload: any;
}

const initialLogin = {
  loginLoading: false,
  loginSuccess: false,
  loginError: false,
  error: {},
};

const initialState = {
  ...initialLogin,
  name: '',
  error: {},
  classesData: [],
  loggedIn: false,
};

export default function videoReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case START_LOGIN:
      return {
        ...state,
        name: action.payload,
        ...initialLogin,
        loginLoading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        ...initialLogin,
        loginSuccess: true,
        classesData: action.payload,
        loggedIn: true,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        ...initialLogin,
        loginError: true,
        error: action.payload,
      };

    case STOP_LOGIN:
      return {
        ...state,
        ...initialLogin,
      };

    case LOGOUT_USER:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
