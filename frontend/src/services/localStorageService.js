import jwtDecode from 'jwt-decode';

function setToken(token) {
  localStorage.setItem("ACCESS_TOKEN", token);
}

function getToken() {
  return localStorage.getItem("ACCESS_TOKEN");
}

function removeToken() {
  localStorage.removeItem("ACCESS_TOKEN");
}

function getRole() {
  if(getToken()) {
      return jwtDecode(getToken()).status;
  }
  return "guest";
}

function getUser() {
  const jwt = jwtDecode(getToken());
  const user = {
    email: jwt.email,
    firstName: jwt.firstName,
    lastName: jwt.lastName,
    role: jwt.status
  }
  return user;
}

export default {
  setToken,
  getToken,
  removeToken,
  getRole,
  getUser,
}