import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { useToast } from '@/components/ui/use-toast';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[':workspaceId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[':workspaceId']['$delete']
>;

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[':workspaceId']['$delete']({
        param,
      });

      if (!response.ok) {
        throw new Error('Failed to delete workspace');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast({
        description: 'Workspace deleded successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspaces', data.$id] });
    },
    onError: () => {
      toast({
        description: 'Faild to deleded workspace',
        variant: 'destructive',
      });
    },
  });

  return mutation;
};
