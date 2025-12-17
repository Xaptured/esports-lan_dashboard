import axios from 'axios';
import { Response } from '@/types/Response';

export const fetchInactiveEventsForAdmin = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/admin/inactive-events'
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

export const fetchPastEventsForAudience = async (email: string | undefined) => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/audience/fetch-past-events?email=' + email
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

export const fetchFutureEventsForAudience = async (
  email: string | undefined
) => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/audience/fetch-future-events?email=' + email
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

export const fetchLiveEventsForAudience = async (email: string | undefined) => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/audience/fetch-live-events?email=' + email
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

export const fetchUnregisteredEventsForAudience = async (
  email: string | undefined
) => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/audience/fetch-unregistered-events?email=' +
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

export const fetchFutureEventsForOrganizer = async (
  email: string | undefined
) => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/organizer/fetch-future-events?email=' + email
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

export const fetchPastEventsForOrganizer = async (
  email: string | undefined
) => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/organizer/fetch-past-events?email=' + email
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

export const fetchLiveEventsForOrganizer = async (
  email: string | undefined
) => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/organizer/fetch-live-events?email=' + email
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

export const fetchPendingTeamsForParticipant = async (
  email: string | undefined
) => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/participant/fetch-pending-teams?email=' + email
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

export const fetchPastEventsForParticipant = async (
  email: string | undefined
) => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/participant/fetch-past-events?email=' + email
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

export const fetchFutureEventsForParticipant = async (
  email: string | undefined
) => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/participant/fetch-future-events?email=' + email
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

export const fetchEventDetails = async (eventName: string) => {
  try {
    const response = await axios.get(
      '/api/event/fetch-event-details?eventName=' + eventName
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

export const fetchTeamDetails = async (eventName: string) => {
  try {
    const response = await axios.get(
      '/api/event/fetch-team-details?eventName=' + eventName
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

export const fetchFeedbackDetails = async (email: string | undefined) => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/feedback/fetch-feedback?email=' + email
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

export const fetchAdvertisementDetails = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/advertisement/fetch-advertisements'
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

export const fetchLiveUpdates = async (category: string, limit: number) => {
  try {
    const response = await axios.get(
      `/api/live-updates?category=${category}&limit=${limit}`
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
        errorMessage: errorBody?.message,
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
