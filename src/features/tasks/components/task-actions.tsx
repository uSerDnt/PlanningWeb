import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { ExternalLinkIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useDeleteTask } from '../api/use-delete-task';
import { useEditTaskModal } from '../hooks/use-edit-task-modal';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useConfirm } from '@/hooks/use-confirm';

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const { open } = useEditTaskModal();
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete task',
    'This is action cannot undone',
    'destructive'
  );
  const { mutate, isPending } = useDeleteTask();

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate({ param: { taskId: id } });
  };

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };

  return (
    <div className="flex items-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={onOpenTask}
            className="p-[10px] font-medium"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Task details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => open(id)}
            className="p-[10px] font-medium"
          >
            <PencilIcon className="mr-2 size-4 stroke-2" />
            Edit task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            className="p-[10px] font-medium"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Open project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            disabled={isPending}
            className="p-[10px] font-medium text-amber-700 focus:text-amber-700"
          >
            <TrashIcon className="mr-2 size-4 stroke-2" />
            Delete task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
