import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { useToast } from '@/components/ui/use-toast';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.members)[':memberId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[':memberId']['$patch']
>;

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[':memberId']['$patch']({
        param,
        json,
      });

      if (!response.ok) {
        throw new Error('Failed to update member');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: 'Member update successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
    onError: () => {
      toast({
        description: 'Faild to update member',
        variant: 'destructive',
      });
    },
  });

  return mutation;
};
