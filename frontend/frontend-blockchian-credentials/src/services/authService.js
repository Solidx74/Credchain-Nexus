import api from "./api";

export const authService = {
  async login(email, password) {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  async register(userData) {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  async getProfile() {
    try {
      const response = await api.get("/auth/profile");
      return response.data.user;
    } catch (error) {
      // If getting profile fails, clear token and throw error
      localStorage.removeItem("token");
      throw new Error("Failed to get user profile");
    }
  },

  async logout() {
    localStorage.removeItem("token");
  },
};
