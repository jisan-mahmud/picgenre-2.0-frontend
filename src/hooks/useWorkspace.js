import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate } from '../api_call/axiosInstance';

// File processing hooks
export const useProcessFiles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (files) => {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });

      const response = await axiosPrivate.post('/workspace/process-files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate processed files query
      queryClient.invalidateQueries({ queryKey: ['workspace', 'processed-files'] });
    },
  });
};

export const useProcessedFiles = () => {
  return useQuery({
    queryKey: ['workspace', 'processed-files'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/workspace/processed-files');
      return response.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useFileQueue = () => {
  return useQuery({
    queryKey: ['workspace', 'queue'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/workspace/queue');
      return response.data;
    },
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 30, // Refetch every 30 seconds
  });
};


export const useRemoveFromQueue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fileId) => {
      const response = await axiosPrivate.delete(`/workspace/queue/${fileId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'queue'] });
    },
  });
};

export const useStopProcessing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.post('/workspace/stop-processing');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'queue'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', 'processed-files'] });
    },
  });
};

// Settings hooks
export const useAIModels = () => {
  return useQuery({
    queryKey: ['settings', 'ai-models'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/settings/ai-models');
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useUpdateAIModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ modelId, settings }) => {
      const response = await axiosPrivate.put(`/settings/ai-models/${modelId}`, settings);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'ai-models'] });
    },
  });
};

export const useHistory = () => {
  return useQuery({
    queryKey: ['settings', 'history'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/settings/history');
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useBillingPlan = () => {
  return useQuery({
    queryKey: ['settings', 'billing-plan'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/settings/billing-plan');
      return response.data;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};