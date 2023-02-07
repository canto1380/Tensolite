export const deleteToken = () => {
  localStorage.removeItem("data-security-page");
  return localStorage.removeItem("jwt-security-page");
};
export const setToken = (token) => {
  return localStorage.setItem("jwt-security-page", JSON.stringify(token));
};
