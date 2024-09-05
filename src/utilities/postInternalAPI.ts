import { CredentialsType } from '@/schemas/credentials';
import { Response } from '@/types/Response';
import axios from 'axios';

export const registerUser = async (userCredential: CredentialsType) => {
  try {
    await axios.post('/api/signup', userCredential);
    return {
      data: undefined,
      message: 'Email Sent! Please verify your email.',
      errorMessage: undefined,
    } as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseBody = error.response?.data;
      if (responseBody.error.message === 'Email already exist')
        return {
          data: undefined,
          message: undefined,
          errorMessage: 'Email already exist.',
        } as Response;
      else
        return {
          data: undefined,
          message: undefined,
          errorMessage: 'Something went wromg. Please try again later.',
        } as Response;
    } else {
      console.log('else');
      return {
        data: undefined,
        message: undefined,
        errorMessage: 'Something went wromg. Please try again later.',
      } as Response;
    }
  }
};

export const loginUser = async (userCredential: CredentialsType) => {
  try {
    const { data } = await axios.post('/api/login', userCredential);
    return {
      data: data,
      message: undefined,
      errorMessage: undefined,
    } as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseBody = error.response?.data;
      if (responseBody.error.message === 'Please verify your account')
        return {
          data: undefined,
          message: undefined,
          errorMessage: 'Please verify your account.',
        } as Response;
      else if (responseBody.error.message === 'Invalid access')
        return {
          data: undefined,
          message: undefined,
          errorMessage: 'Invalid access.',
        } as Response;
      else if (responseBody.error.message === 'User not found')
        return {
          data: undefined,
          message: undefined,
          errorMessage: 'Email ID does not exist.',
        } as Response;
      else if (responseBody.error.message === 'Bad credentials')
        return {
          data: undefined,
          message: undefined,
          errorMessage: 'Password is incorrect.',
        } as Response;
      else
        return {
          data: undefined,
          message: undefined,
          errorMessage: 'Something went wrong. Please try again later.',
        } as Response;
    } else {
      return {
        data: undefined,
        message: undefined,
        errorMessage: 'Something went wrong. Please try again later.',
      } as Response;
    }
  }
};