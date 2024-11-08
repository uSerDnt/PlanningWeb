import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { useToast } from '@/components/ui/use-toast';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[':workspaceId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[':workspaceId']['$patch']
>;

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.workspaces[':workspaceId']['$patch']({
        form,
        param,
      });

      if (!response.ok) {
        throw new Error('Failed to update workspace');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast({
        description: 'Workspace updated successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', data.$id] });
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
