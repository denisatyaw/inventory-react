import axiosInstance from "../config/axiosConfig";

const API_URL = "/user/";

const register = async (username, email, password, address, phone, roles) => {
  try {
    console.log("Registering user:", username, email, password, address, phone, roles);
    const response = await axiosInstance.post(API_URL + "register", {
      username,
      email,
      password,
      address,
      phone,
      roles
    });

    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}

const UserService = {
  register
};

export default UserService;
