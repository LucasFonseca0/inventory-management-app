import  axios  from "axios";

export default async function getStockById(id){
    const token = localStorage.getItem('accessToken');

    if (token) {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        
        const Url = `http://localhost:8000/stock/${id}`

        try {
          const response = await axios.get(Url, config);
          return response.data;
        } catch (error) {
          console.error('Erro na requisição GET com Headers', error);
        }
      }
    }
