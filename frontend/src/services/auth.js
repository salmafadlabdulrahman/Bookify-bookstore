import API from "./api";

export const signup = async (formData) => {
  const { data } = await API.post("/auth/signup", formData);
  localStorage.setItem("token", data.token); 
  return data;
};

export const signin = async (formData) => {
  const { data } = await API.post("/auth/signin", formData);
  localStorage.setItem("token", data.token);
  return data;
};

// export const logout = () => {
//   localStorage.removeItem("token");
// };