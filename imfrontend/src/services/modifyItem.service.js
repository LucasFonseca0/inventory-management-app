import axios from 'axios';
import { toast } from 'react-toastify';

export default async function ModifyItemService(stockID, itemID,data) {
  const token = localStorage.getItem('accessToken');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  const URL = `http://localhost:8000/stock/modifyItem/${stockID}/${itemID}`;

  try {
    const response = await axios.patch(URL, data, config);

    toast.success('The item has been successfully changed');
    return response; 
  } catch (error) {
    toast.error(error.response.data.message);

  }
}
