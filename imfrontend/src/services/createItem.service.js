import axios from 'axios';
import { toast } from 'react-toastify';

export default async function CreateItemService(stockID,data) {
  const token = localStorage.getItem('accessToken');


  const item = {item:{...data}}

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  const URL = `http://localhost:8000/stock/createItem/${stockID}`;

  try {
    const response = await axios.patch(URL, item, config);

    toast.success('The item has been successfully created');
    return response; 
  } catch (error) {
    toast.error(error.response.data.message);
  }
}
