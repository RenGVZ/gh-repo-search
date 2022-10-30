import axios from 'axios';

interface ApiProps {
  searchQuery: string
}

const baseUrl = 'https://api.github.com/search/repositories'
// https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}

export const getReposApi = async ({searchQuery}: ApiProps): Promise<Array<[]> | void> => {
  try {
    const res = await axios.get(`${baseUrl}?q=${searchQuery}`);
    console.log('gh repo results:', res);
    
    return res.data.items
  } catch (error) {
    console.log('error:', error);
  }
}