import { redirect } from 'next/navigation';

import { ProjectSettingsClient } from './client';

import { getCurrent } from '@/features/auth/queries';

const WorkspaceIdSettingsPage = async () => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  return <ProjectSettingsClient />;
};
export default WorkspaceIdSettingsPage;
