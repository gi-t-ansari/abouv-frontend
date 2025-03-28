export const APP_URL = {
  REGISTER: "/register",
  LOGIN: "/login",
  DASHBOARD: "/",
};

export const BASE_URL = "https://abouv-backend.onrender.com/api";
export const AUTH_URL = `${BASE_URL}/auth`;

export const API_URL = {
  REGISTER: `${AUTH_URL}/register`,
  LOGIN: `${AUTH_URL}/login`,
  TASKS: `${API_URL}/tasks`,
};
