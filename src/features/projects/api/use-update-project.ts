import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.projects)[':projectId']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[':projectId']['$patch']
>;

export const useUpdateProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.projects[':projectId']['$patch']({
        form,
        param,
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast({
        description: 'Project updated successfully',
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', data.$id] });
    },
    onError: () => {
      toast({
        description: 'Faild to update project',
        variant: 'destructive',
      });
    },
  });

  return mutation;
};
