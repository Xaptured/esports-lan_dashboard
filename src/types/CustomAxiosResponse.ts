import { AxiosResponse } from 'axios';

export interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  headers: {
    'access-token': string;
    role: string;
  };
}
