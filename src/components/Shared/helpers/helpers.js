import { jwtDecode } from "jwt-decode";
import { format, parseISO } from "date-fns";

export const convertURL = (url) => {
  const change = url.replace("file/d/", "uc?export=view&id=");
  const newurl = change.replace("/view?usp=drive_link", "");

  return newurl;
};

export const validateEmail = (email) => {
  if (!email || !email.trim()) return "Email is required";
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email)
    ? ""
    : "Please enter a valid email address (e.g., user@example.com).";
};

export const validatePassword = (password) => {
  if (!password || !password.trim()) return "Password is required";

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d!@#$%^&*(),.?":{}|<>])(?=.{8,})/;

  return passwordPattern.test(password)
    ? ""
    : "Password is too weak. Use 8+ characters, 1 uppercase, 1 lowercase, and at least 1 number or 1 symbol (e.g., Test@123).";
};

export const validateUserName = (username) => {
  if (!username || !username.trim()) return "Username is required";
  return "";
};

export const validateForm = (form) => {
  let res = false;
  Object.values(form).forEach((val) => {
    if (!val || !val.trim()) res = true;
  });
  return res;
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.log(error);
    return true;
  }
};

export const formatDate = (isoDateString) => {
  if (!isoDateString) return "";
  const date = parseISO(isoDateString);

  return format(date, "dd.MM.yyyy");
};
