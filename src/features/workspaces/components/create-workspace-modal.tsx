'use client';

import { useCreateWorkspaceModal } from '../hooks/use-create-workspace-modal';
import { CreateWorkspaceForm } from './create-workspace-form';

import { ResponsiveModal } from '@/components/responsive-modal';

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={close} />
    </ResponsiveModal>
  );
};
