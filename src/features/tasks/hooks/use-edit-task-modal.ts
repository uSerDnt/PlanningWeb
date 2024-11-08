import { parseAsString, useQueryState } from 'nuqs';

export const useEditTaskModal = () => {
  const [taskId, setTaskId] = useQueryState('edit-task', parseAsString);
  // localhost:3000?create-workspace=true

  const open = (id: string) => setTaskId(id);
  const close = () => setTaskId(null);

  return {
    taskId,
    open,
    close,
    setTaskId,
  };
};
