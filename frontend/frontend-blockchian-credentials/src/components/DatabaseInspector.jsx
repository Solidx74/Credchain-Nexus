const [verifications, setVerifications] = useState([]);

const fetchVerifications = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "http://localhost:5000/api/admin/verifications",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setVerifications(data.verifications || []);
  } catch (error) {
    console.error("Error fetching verifications:", error);
  }
};

const fetchAllData = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");

    const [usersRes, credentialsRes, verificationsRes] = await Promise.all([
      fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("http://localhost:5000/api/admin/credentials", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("http://localhost:5000/api/admin/verifications", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    const usersData = await usersRes.json();
    const credentialsData = await credentialsRes.json();
    const verificationsData = await verificationsRes.json();

    setUsers(usersData.users || []);
    setCredentials(credentialsData.credentials || []);
    setVerifications(verificationsData.verifications || []);
  } catch (error) {
    console.error("Error fetching data:", error);
    showSnackbar("Error fetching data", "error");
  } finally {
    setLoading(false);
  }
};
