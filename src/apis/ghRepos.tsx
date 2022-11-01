import axios from 'axios';

interface ApiProps {
  query: string;
  page_number: number;
}

const baseUrl = 'https://api.github.com/search/repositories'
// https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}

export const getReposApi = async ({query, page_number}: ApiProps): Promise<Array<[]> | void> => {
  try {
    const config = {
      headers: {
        "Accept": "application/vnd.github+json"
      }
    }
    const res: any = await axios.get(`${baseUrl}?q=${query}&sort=stars&per_page=5&page=${page_number}`, config);
    return res;
  } catch (error: any) {
    console.log('error in api:', error);
    return error;
  }
}