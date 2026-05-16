import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate, axiosPublic } from '../api_call/axiosInstance';

// Authentication hooks
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await axiosPublic.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });
      return data;
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Frontend-only logout: no API call required.
      return null;
    },
    onSuccess: () => {
      // Clear all cached data on logout
      queryClient.clear();
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async (refreshToken) => {
      const response = await axiosPublic.post('/v1/accounts/auth/token/refresh/', { refresh: refreshToken });
      return response.data;
    },
  });
};

// User profile hooks
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/v1/profile/');
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData) => {
      const response = await axiosPrivate.patch('/v1/profile/', profileData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });
};

export const useNotificationSettings = () => {
  return useQuery({
    queryKey: ['user', 'notifications'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/v1/settings/notification/');
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateNotificationSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosPrivate.patch('/v1/settings/notification/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'notifications'] });
    },
  });
};

// Generic API hooks
export const useApiQuery = (key, url, options = {}) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await axiosPrivate.get(url);
      return response.data;
    },
    ...options,
  });
};

export const useApiMutation = (url, method = 'post', options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosPrivate[method.toLowerCase()](url, data);
      return response.data;
    },
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      // Call custom onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};