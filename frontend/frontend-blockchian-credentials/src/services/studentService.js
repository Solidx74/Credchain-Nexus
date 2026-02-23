import api from "./api";

export const studentService = {
  async addStudent(studentData) {
    const response = await api.post("/students/add", studentData);
    return response.data;
  },

  async getStudents() {
    const response = await api.get("/students");
    return response.data;
  },
};
