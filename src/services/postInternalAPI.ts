import { EVENT_STATUS } from '@/enums/Event';
import { TEAM_STATUS } from '@/enums/Team';
import { AudienceType } from '@/schemas/audience';
import { CredentialsType } from '@/schemas/credentials';
import { EventType } from '@/schemas/event';
import { HelpType } from '@/schemas/help';
import { TeamType } from '@/schemas/team';
import { CustomAxiosResponse } from '@/types/CustomAxiosResponse';
import { Response } from '@/types/Response';
import {
  generateMerchantTransactionID,
  prepareSaveTeamsPayload,
} from '@/utilities/utils';
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

export const saveOrUpdateEvent = async (
  event: EventType,
  isUpdate: boolean,
  email: string
) => {
  try {
    const payload = {
      ...event,
      eventStatus: EVENT_STATUS.INACTIVE,
      email: email,
    };
    const response = await axios.post(
      '/api/organizer/save-update-event?isUpdate=' + isUpdate,
      payload
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

export const saveTeams = async (teams: TeamType[], eventName: string) => {
  try {
    const payload = prepareSaveTeamsPayload(teams, eventName);
    const response = await axios.post('/api/organizer/save-teams', payload);
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
  email: string | undefined
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

export const saveComments = async (data: HelpType) => {
  try {
    const response = await axios.post('/api/comments/save-comments', data);
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

export const payAmount = async (
  data: AudienceType,
  amount: number,
  eventName: string
) => {
  try {
    const payload = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      amount: amount,
      eventName: eventName,
    };
    return await axios.post('/api/payment/pay', payload);
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
