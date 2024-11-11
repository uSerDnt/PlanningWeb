import { redirect } from 'next/navigation';

import { WorkspaceIdSettingsClient } from './client';

import { getCurrent } from '@/features/auth/queries';

const WorkspaceIdSettingsPage = async () => {
  const current = await getCurrent();
  if (!current) redirect('/sign-in');

  return <WorkspaceIdSettingsClient />;
};

export default WorkspaceIdSettingsPage;
