import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.projects)[':projectId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[':projectId']['$delete']
>;

export const useDeleteProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[':projectId']['$delete']({
        param,
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast({
        description: 'Project deleted successfully',
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', data.$id] });
    },
    onError: () => {
      toast({
        description: 'Faild to delete project',
        variant: 'destructive',
      });
    },
  });

  return mutation;
};
