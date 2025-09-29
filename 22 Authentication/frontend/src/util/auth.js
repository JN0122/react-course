import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = new Date(localStorage.getItem("expiration"));
  const now = new Date();
  const duration = storedExpirationDate.getTime() - now.getTime();
  return duration;
}

export function setTokenDuration(duration) {
  const expiration = new Date(new Date().getTime() + duration);
  localStorage.setItem("expiration", expiration.toISOString());
}

export function clearTokenDuration() {
  localStorage.removeItem("expiration");
}

export function getToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    clearToken();
    return "EXPIRED";
  }

  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

export function tokenLoader() {
  return getToken();
}

export function checkAuthLoader() {
  const token = getToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
}
