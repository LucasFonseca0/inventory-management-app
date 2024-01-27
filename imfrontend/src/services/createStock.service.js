import axios from "axios";
import { toast } from "react-toastify";

export default async function CreateStockService(data) {


    const token = localStorage.getItem('accessToken');

    const URL = "http://localhost:8000/stock/createStock";
    const notifyError = (resp) => toast.error(resp);
    const notifySuccess = (resp) => toast.success(resp);

    const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };
    try {
      const response = await axios.post(URL, data, config);
      notifySuccess('The stock has been successfully created');
      return true; 
    } catch (error) {
      notifyError(error.response.data.message);
   
      throw false; 
    }
}
