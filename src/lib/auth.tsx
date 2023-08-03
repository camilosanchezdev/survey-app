/* eslint-disable no-restricted-imports */
import { LoginCredentialsDTO, loginWithEmailAndPassword } from '@/features/auth/api/login';
import storage from '@/utils/storage';

type LoginFnResponse = {
  success: boolean;
  successData?: string;
  error?: any;
};

async function loginFn(data: LoginCredentialsDTO): Promise<LoginFnResponse> {
  try {
    const response = await loginWithEmailAndPassword(data);
    const token = response.access_token;
    storage.setToken(token);
    return { success: true, successData: response.access_token };
  } catch (error) {
    return { success: false, error };
  }
}

export const authConfig = { loginFn };
