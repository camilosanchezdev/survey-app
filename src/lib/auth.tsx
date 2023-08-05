/* eslint-disable no-restricted-imports */
import { LoginCredentialsDTO, loginWithEmailAndPassword } from '@/features/auth/api/login';
import { BaseResponse } from '@/types/base-response.type';
import storage from '@/utils/storage';

async function loginFn(data: LoginCredentialsDTO): Promise<BaseResponse> {
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
