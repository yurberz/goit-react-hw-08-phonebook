const isAuth = (state) => state.auth.token;
const getUserName = (state) => state.auth.user.name;

export default { isAuth, getUserName };
