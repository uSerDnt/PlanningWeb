import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { useToast } from '@/components/ui/use-toast';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.projects)['$post'],
  200
>;
type RequestType = InferRequestType<(typeof client.api.projects)['$post']>;

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.projects['$post']({ form });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: 'Project created successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: () => {
      toast({
        description: 'Faild to create project',
        variant: 'destructive',
      });
    },
  });

  return mutation;
};
