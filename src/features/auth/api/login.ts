import { axios } from '@/lib/axios';

type LoginResponse = {
  access_token: string;
  roleId: number;
};
export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<LoginResponse> => {
  return axios.post('/auth/login', data);
};
