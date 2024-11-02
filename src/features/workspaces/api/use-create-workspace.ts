import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { useToast } from '@/components/ui/use-toast';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<(typeof client.api.workspaces)['$post']>;
type RequestType = InferRequestType<(typeof client.api.workspaces)['$post']>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.workspaces['$post']({ json });

      if (!response.ok) {
        throw new Error('Failed to create workspace');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: 'Workspace created successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
    onError: () => {
      toast({
        description: 'Faild to create workspace',
        variant: 'destructive',
      });
    },
  });

  return mutation;
};
