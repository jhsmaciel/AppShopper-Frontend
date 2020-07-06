import { apiGit } from "."

export const getRepoByName = async (search: string) => {
    const { data } = await apiGit.get<Repository>(`repos/${search}`);
    return data;
}

export const getRepositories = async () => {
  const { data } = await apiGit.get<Repository[]>(`/repositories`);
  return data;
}

export interface Repository {
  id: number, 
  full_name: string,
  description: string,
  name: string,
  owner: {
    login: string,
    avatar_url: string,
  }
}