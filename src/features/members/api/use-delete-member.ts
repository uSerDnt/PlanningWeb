import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { useToast } from '@/components/ui/use-toast';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.members)[':memberId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[':memberId']['$delete']
>;

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.members[':memberId']['$delete']({
        param,
      });

      if (!response.ok) {
        throw new Error('Failed to delete member');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast({
        description: 'Member deleded successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', data.$id] });
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
