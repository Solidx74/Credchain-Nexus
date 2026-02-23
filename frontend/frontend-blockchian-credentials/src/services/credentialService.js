import api from "./api";

export const credentialService = {
  async getStudentCredentials() {
    const response = await api.get("/credentials/student");
    return response.data;
  },

  async getUniversityCredentials() {
    const response = await api.get("/credentials/university");
    return response.data;
  },

  async issueCredential(credentialData) {
    const response = await api.post("/credentials/issue", credentialData);
    return response.data;
  },

  async verifyCredential(hash) {
    console.log("🔍 Frontend: Verifying hash:", hash);
    console.log("🔍 Frontend: Current token:", localStorage.getItem("token"));

    const response = await api.get(`/credentials/verify/${hash}`);

    console.log("✅ Frontend: Verification response:", response.data);
    return response.data;
  },

  async getAllCredentials() {
    const response = await api.get("/credentials/all");
    return response.data;
  },
};
