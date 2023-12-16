import axios from "axios";

export default async function getUserData() {
  const token = localStorage.getItem('accessToken');

  if (token) {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get('http://localhost:8000/me', config);
      return response.data;
    } catch (error) {
      console.error('Erro na requisição GET com Headers', error);
    }
  } else {
    return undefined
  }
}
