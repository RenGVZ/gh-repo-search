import axios from 'axios';

interface ApiProps {
  query: string
}

const baseUrl = 'https://api.github.com/search/repositories'
// https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}

export const getReposApi = async ({query}: ApiProps): Promise<Array<[]> | void> => {
  try {
    const res: any = await axios.get(`${baseUrl}?q=${query}`);
    console.log('res in api:', res);
    return res;
  } catch (error: any) {
    console.log('error in api:', error);
    return error;
  }
}