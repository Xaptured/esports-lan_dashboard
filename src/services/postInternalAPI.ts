import { EVENT_STATUS } from '@/enums/Event';
import { TEAM_STATUS } from '@/enums/Team';
import { CredentialsType } from '@/schemas/credentials';
import { CustomAxiosResponse } from '@/types/CustomAxiosResponse';
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
      return {
        data: undefined,
        message: undefined,
        errorMessage: 'Something went wromg. Please try again later.',
      } as Response;
    }
  }
};

export const loginUser = async (
  userCredential: CredentialsType
): Promise<Response> => {
  try {
    const response = await axios.post<any, CustomAxiosResponse>(
      '/api/login',
      userCredential
    );
    sessionStorage.setItem('access-token', response.headers['access-token']);
    sessionStorage.setItem('role', response.headers['role']);
    sessionStorage.setItem('email', response.data.email);

    return {
      data: response.data,
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

export const updateEventStatus = async (
  eventName: string,
  status: EVENT_STATUS
) => {
  try {
    const response = await axios.post(
      '/api/admin/update-event-status?eventName=' +
        eventName +
        '&status=' +
        status
    );
    const { responseBody } = response.data;
    return {
      data: responseBody,
      message: undefined,
      errorMessage: undefined,
    } as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { errorBody } = error.response?.data;
      return {
        data: errorBody,
        message: undefined,
        errorMessage: errorBody.message,
      } as Response;
    } else {
      return {
        data: undefined,
        message: undefined,
        errorMessage: 'Something went wromg. Please try again later.',
      } as Response;
    }
  }
};

// TODO: assign type for audience
export const saveOrUpdateAudience = async (audience: object) => {
  try {
    const response = await axios.post(
      '/api/audience/save-update-audience',
      audience
    );
    const { responseBody } = response.data;
    return {
      data: responseBody,
      message: undefined,
      errorMessage: undefined,
    } as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { errorBody } = error.response?.data;
      return {
        data: errorBody,
        message: undefined,
        errorMessage: errorBody.message,
      } as Response;
    } else {
      return {
        data: undefined,
        message: undefined,
        errorMessage: 'Something went wromg. Please try again later.',
      } as Response;
    }
  }
};

// TODO: assign type for event
export const saveOrUpdateEvent = async (event: object, isUpdate: boolean) => {
  try {
    const response = await axios.post(
      '/api/organizer/save-update-event?isUpdate=' + isUpdate,
      event
    );
    const { responseBody } = response.data;
    return {
      data: responseBody,
      message: undefined,
      errorMessage: undefined,
    } as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { errorBody } = error.response?.data;
      return {
        data: errorBody,
        message: undefined,
        errorMessage: errorBody.message,
      } as Response;
    } else {
      return {
        data: undefined,
        message: undefined,
        errorMessage: 'Something went wromg. Please try again later.',
      } as Response;
    }
  }
};

export const saveTeams = async (teams: object[]) => {
  try {
    const response = await axios.post('/api/organizer/save-teams', teams);
    const { responseBody } = response.data;
    return {
      data: responseBody,
      message: undefined,
      errorMessage: undefined,
    } as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { errorBody } = error.response?.data;
      return {
        data: errorBody,
        message: undefined,
        errorMessage: errorBody.message,
      } as Response;
    } else {
      return {
        data: undefined,
        message: undefined,
        errorMessage: 'Something went wromg. Please try again later.',
      } as Response;
    }
  }
};

export const updateTeamStatus = async (
  eventName: string,
  status: TEAM_STATUS,
  email: string
) => {
  try {
    const response = await axios.post(
      '/api/participant/update-team-status?eventName=' +
        eventName +
        '&status=' +
        status +
        '&email=' +
        email
    );
    const { responseBody } = response.data;
    return {
      data: responseBody,
      message: undefined,
      errorMessage: undefined,
    } as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { errorBody } = error.response?.data;
      return {
        data: errorBody,
        message: undefined,
        errorMessage: errorBody.message,
      } as Response;
    } else {
      return {
        data: undefined,
        message: undefined,
        errorMessage: 'Something went wromg. Please try again later.',
      } as Response;
    }
  }
};
