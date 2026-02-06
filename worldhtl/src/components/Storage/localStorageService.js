// src/utils/localStorageService.js

const LOCAL_STORAGE_KEY = "user";

export const saveUserToLocalStorage = (user) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem(LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const saveUserToken = (token) => {
  localStorage.setItem("token", token);
};

export const getUserToken = () => {
  const token = localStorage.getItem("token");
  
  return token;
};

export const removeUserToken = () => {
  localStorage.removeItem("token");
};
