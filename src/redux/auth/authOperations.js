import axios from "axios";
import authActions from "./authActions";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const register = (user) => async (dispatch) => {
  dispatch(authActions.registerRequest());

  try {
    const { data } = await axios.post("/users/signup", user);

    dispatch(authActions.registerSuccess(data));
  } catch (error) {
    dispatch(authActions.registerError(error.message));
  }
};

const logIn = (user) => async (dispatch) => {
  dispatch(authActions.loginRequest());

  try {
    const { data } = await axios.post("/users/login", user);

    token.set(data.token);
    dispatch(authActions.loginSuccess(data));
  } catch (error) {
    dispatch(authActions.loginError(error.message));
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);
  dispatch(authActions.getCurrentUserRequest());

  try {
    const { data } = await axios.get("/users/current");

    dispatch(authActions.getCurrentUserSuccess(data));
  } catch (error) {
    dispatch(authActions.getCurrentUserError(error.message));
  }
};

const logOut = () => async (dispatch) => {
  dispatch(authActions.logoutRequest());

  try {
    await axios.post("/users/logout");

    token.unset();
    dispatch(authActions.logoutSuccess());
  } catch (error) {
    dispatch(authActions.logoutError(error.message));
  }
};

export default { register, logOut, logIn, getCurrentUser };
