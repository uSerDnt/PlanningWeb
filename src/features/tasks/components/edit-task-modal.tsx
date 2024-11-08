'use client';

import { useEditTaskModal } from '../hooks/use-edit-task-modal';
import { EditTaskFromWrapper } from './edit-task-form-wrapper';

import { ResponsiveModal } from '@/components/responsive-modal';

export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal();
  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFromWrapper id={taskId} onCancel={close} />}
    </ResponsiveModal>
  );
};
