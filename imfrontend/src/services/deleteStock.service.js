import axios from 'axios';
import { toast } from 'react-toastify';

export default async function DeleteStockService(stockID) {
    const token = localStorage.getItem('accessToken');
    
    
    const URL = `http://localhost:8000/stock/deleteStock/${stockID}`;

  try {
    const response = await axios.delete(URL,  {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    toast.success('The Stock has been successfully deleted');
    return response; 
  } catch (error) {
    toast.error(error.response.data.message);    
  }
}
