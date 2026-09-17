export const useAuth = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("poll_token");
    window.location.href = "/";
  };

  return {
    isAuthenticated: !!token,
    logout,
  };
};
