import  axios  from "axios";

export default async function getAllStocks(){
    const token = localStorage.getItem('accessToken');

    if (token) {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
  
      try {
        const response = await axios.get('http://localhost:8000/stock/Stocks', config);
        return response.data;
      } catch (error) {
        console.error('Erro na requisição GET com Headers', error);
      }
    } 
      };