import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[':workspaceId']['reset-invite-code']['$post'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[':workspaceId']['reset-invite-code']['$post']
>;

export const useResetInviteCode = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[':workspaceId'][
        'reset-invite-code'
      ]['$post']({
        param,
      });

      if (!response.ok) {
        throw new Error('Failed to reset invite code');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast({
        description: 'Invite code reset successfully',
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', data.$id] });
    },
    onError: () => {
      toast({
        description: 'Faild to reset invite code',
        variant: 'destructive',
      });
    },
  });

  return mutation;
};
