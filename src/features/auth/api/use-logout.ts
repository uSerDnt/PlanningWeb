import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>;

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout['$post']();
      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: 'Logged out successfully',
      });

      router.refresh();
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast({
        description: 'Failed to logout',
        variant: 'destructive',
      });
    },
  });

  return mutation;
};
