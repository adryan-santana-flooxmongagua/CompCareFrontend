const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";
const API_BASE_IMAGE_URL = API_BASE_URL.replace("/api", "");

export { API_BASE_URL, API_BASE_IMAGE_URL };
