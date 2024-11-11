import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { useToast } from '@/components/ui/use-toast';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.tasks)[':taskId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks)[':taskId']['$delete']
>;

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.tasks[':taskId']['$delete']({ param });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast({
        description: 'task deleted successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['project-analytics'] });
      queryClient.invalidateQueries({ queryKey: ['workspace-analytics'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', data.$id] });
    },
    onError: () => {
      toast({
        description: 'Faild to delete task',
        variant: 'destructive',
      });
    },
  });

  return mutation;
};
