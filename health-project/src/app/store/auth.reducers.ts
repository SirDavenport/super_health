import * as AuthActions from "./auth.actions";
export interface AuthState {
  token: string;
  roles: string[];
  authError: string;
}

const initialState = {
  token: null,
  roles: [],
  authError: null
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.SET_TOKEN: {
      const token = action.payload[0];
      const roles = action.payload.splice(1, action.payload.length);
      return {
        ...state,
        token: token,
        roles: roles
      };
    }
    case AuthActions.SET_AUTH_ERROR: {
      return {
        ...state,
        authError: action.payload
      };
    }
    case AuthActions.LOG_OUT: {
      return {
        ...state,
        authError: null,
        token: null,
        roles: []
      };
    }
    default: {
      return state;
    }
  }
}
