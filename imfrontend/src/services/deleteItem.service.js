import axios from 'axios';
import { toast } from 'react-toastify';

export default async function DeleteItemService(stockID, itemID) {
  const token = localStorage.getItem('accessToken');


  const URL = `http://localhost:8000/stock/deleteItem/${stockID}/${itemID}`;

  try {
    const response = await axios.patch(URL, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    toast.success('The item has been successfully deleted');
    return response; 
  } catch (error) {
    toast.error(error.response.data.message);
  
    
  }
}
