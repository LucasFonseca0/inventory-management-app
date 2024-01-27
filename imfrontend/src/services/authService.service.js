import axios from "axios";
import loginValidation from "../validations/loginValidation";
import { toast } from "react-toastify";

export default async function authService(data) {
  const resultValidation = loginValidation(data);

  if (resultValidation) {
    const URL = "http://localhost:8000/login";
    const notifyError = (resp) => toast.error(resp);
    const notifySuccess = (resp) => toast.success(resp);

    try {
      const response = await axios.post(URL, data);
      notifySuccess('O login foi um sucesso');
      localStorage.setItem('accessToken', response.data.access_token);
      return true; 
    } catch (error) {
      notifyError(error.response.data.message);
      throw error; 
    }
  }

  return false;
}